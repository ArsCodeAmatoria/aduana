use crate::{mock::*, Error, CountryPair, TariffRate, TariffSchedule};
use frame_support::{assert_noop, assert_ok, BoundedVec};
use sp_runtime::traits::BadOrigin;

// Helper function to create a BoundedVec from a string
fn bounded_vec(input: &str, max_length: u32) -> BoundedVec<u8, frame_support::traits::ConstU32<64>> {
	BoundedVec::<u8, frame_support::traits::ConstU32<64>>::try_from(input.as_bytes().to_vec())
		.expect("input exceeds maximum length")
}

// Helper function to create a country pair
fn create_country_pair(origin: [u8; 2], destination: [u8; 2]) -> CountryPair {
	CountryPair {
		origin,
		destination,
	}
}

#[test]
fn create_tariff_schedule_works() {
	new_test_ext().execute_with(|| {
		// Define HS code for testing (e.g., 020110 for "Bovine carcasses, fresh/chilled")
		let hs_code = [0u8, 2, 0, 1, 1, 0];
		let name = bounded_vec("Beef Products", 64);
		let description = bounded_vec("Tariff schedule for fresh and chilled beef products", 256);
		
		// Create a tariff schedule with root origin
		assert_ok!(TariffLogic::create_tariff_schedule(
			RuntimeOrigin::root(),
			hs_code,
			name.clone(),
			description.clone()
		));
		
		// Verify the schedule was created with ID 0
		let schedule = TariffLogic::tariff_schedules(0).expect("Schedule should exist");
		assert_eq!(schedule.hs_code, hs_code);
		assert_eq!(schedule.name, name);
		assert_eq!(schedule.description, description);
		assert_eq!(schedule.active, true);
		
		// Verify the next schedule ID was incremented
		assert_eq!(TariffLogic::next_schedule_id(), 1);
		
		// Non-root users should not be able to create schedules
		assert_noop!(
			TariffLogic::create_tariff_schedule(RuntimeOrigin::signed(1), hs_code, name, description),
			BadOrigin
		);
	});
}

#[test]
fn set_tariff_rate_works() {
	new_test_ext().execute_with(|| {
		// First create a tariff schedule
		let hs_code = [0u8, 2, 0, 1, 1, 0];
		let name = bounded_vec("Beef Products", 64);
		let description = bounded_vec("Tariff schedule for fresh and chilled beef products", 256);
		
		assert_ok!(TariffLogic::create_tariff_schedule(
			RuntimeOrigin::root(),
			hs_code,
			name,
			description
		));
		
		// Create a country pair (MX -> US)
		let country_pair = create_country_pair(*b"MX", *b"US");
		
		// Set tariff rates for the country pair
		let base_rate = 1000; // 10%
		let preferential_rate = 200; // 2% under USMCA
		let requires_zk_proof = true;
		
		assert_ok!(TariffLogic::set_tariff_rate(
			RuntimeOrigin::root(),
			0, // schedule ID
			country_pair.clone(),
			base_rate,
			preferential_rate,
			requires_zk_proof
		));
		
		// Verify the rate was set correctly
		let rate = TariffLogic::tariff_rates(0, &country_pair).expect("Rate should exist");
		assert_eq!(rate.base_rate, base_rate);
		assert_eq!(rate.preferential_rate, preferential_rate);
		assert_eq!(rate.requires_zk_proof, requires_zk_proof);
		
		// Non-root users should not be able to set rates
		assert_noop!(
			TariffLogic::set_tariff_rate(
				RuntimeOrigin::signed(1),
				0,
				country_pair,
				base_rate,
				preferential_rate,
				requires_zk_proof
			),
			BadOrigin
		);
		
		// Cannot set rate for non-existent schedule
		assert_noop!(
			TariffLogic::set_tariff_rate(
				RuntimeOrigin::root(),
				99, // non-existent schedule ID
				country_pair,
				base_rate,
				preferential_rate,
				requires_zk_proof
			),
			Error::<Test>::TariffScheduleNotFound
		);
	});
}

#[test]
fn apply_tariff_works() {
	new_test_ext().execute_with(|| {
		// First create a tariff schedule
		let hs_code = [0u8, 2, 0, 1, 1, 0];
		let name = bounded_vec("Beef Products", 64);
		let description = bounded_vec("Tariff schedule for fresh and chilled beef products", 256);
		
		assert_ok!(TariffLogic::create_tariff_schedule(
			RuntimeOrigin::root(),
			hs_code,
			name,
			description
		));
		
		// Create a country pair (MX -> US)
		let country_pair = create_country_pair(*b"MX", *b"US");
		
		// Set tariff rates for the country pair
		let base_rate = 1000; // 10%
		let preferential_rate = 200; // 2%
		let requires_zk_proof = false; // No ZK proof required for this test
		
		assert_ok!(TariffLogic::set_tariff_rate(
			RuntimeOrigin::root(),
			0, // schedule ID
			country_pair.clone(),
			base_rate,
			preferential_rate,
			requires_zk_proof
		));
		
		// Apply a tariff using the base rate
		let account_id = 1; // User with 100 balance
		let shipment_value = 50;
		
		// Get the initial reserved balance
		let initial_reserved = Balances::reserved_balance(account_id);
		
		assert_ok!(TariffLogic::apply_tariff(
			RuntimeOrigin::signed(account_id),
			0, // schedule ID
			country_pair.clone(),
			shipment_value,
			false // use base rate, not preferential
		));
		
		// Verify the tariff amount was reserved
		// Base rate is 10%, so 10% of 50 = 5
		let expected_tariff = 5;
		let new_reserved = Balances::reserved_balance(account_id);
		assert_eq!(new_reserved, initial_reserved + expected_tariff);
		
		// Now try with the preferential rate
		let account_id = 2; // User with 200 balance
		let initial_reserved = Balances::reserved_balance(account_id);
		
		assert_ok!(TariffLogic::apply_tariff(
			RuntimeOrigin::signed(account_id),
			0, // schedule ID
			country_pair.clone(),
			shipment_value,
			true // use preferential rate
		));
		
		// Verify the preferential tariff amount was reserved
		// Preferential rate is 2%, so 2% of 50 = 1
		let expected_tariff = 1;
		let new_reserved = Balances::reserved_balance(account_id);
		assert_eq!(new_reserved, initial_reserved + expected_tariff);
	});
}

#[test]
fn apply_tariff_fails_with_insufficient_balance() {
	new_test_ext().execute_with(|| {
		// Setup a tariff schedule and rate
		let hs_code = [0u8, 2, 0, 1, 1, 0];
		let name = bounded_vec("Beef Products", 64);
		let description = bounded_vec("Tariff description", 256);
		
		assert_ok!(TariffLogic::create_tariff_schedule(
			RuntimeOrigin::root(),
			hs_code,
			name,
			description
		));
		
		let country_pair = create_country_pair(*b"MX", *b"US");
		
		assert_ok!(TariffLogic::set_tariff_rate(
			RuntimeOrigin::root(),
			0,
			country_pair.clone(),
			1000, // 10%
			200,  // 2%
			false
		));
		
		// User 1 has 100 balance, try to apply tariff on a shipment that will require more than that
		let account_id = 1;
		let shipment_value = 1500; // 10% of this is 150, which exceeds the 100 balance
		
		assert_noop!(
			TariffLogic::apply_tariff(
				RuntimeOrigin::signed(account_id),
				0,
				country_pair,
				shipment_value,
				false
			),
			Error::<Test>::InsufficientBalance
		);
	});
}

#[test]
fn zk_proof_verification_works() {
	new_test_ext().execute_with(|| {
		// Setup a tariff schedule and rate
		let hs_code = [0u8, 2, 0, 1, 1, 0];
		let name = bounded_vec("Beef Products", 64);
		let description = bounded_vec("Tariff description", 256);
		
		assert_ok!(TariffLogic::create_tariff_schedule(
			RuntimeOrigin::root(),
			hs_code,
			name,
			description
		));
		
		let country_pair = create_country_pair(*b"MX", *b"US");
		
		assert_ok!(TariffLogic::set_tariff_rate(
			RuntimeOrigin::root(),
			0,
			country_pair.clone(),
			1000, // 10%
			200,  // 2%
			true  // ZK proof required
		));
		
		// Verify a ZK proof for user 1
		let account_id = 1;
		let proof_data = BoundedVec::<u8, frame_support::traits::ConstU32<1024>>::try_from(vec![1, 2, 3, 4]).unwrap();
		let issuer = bounded_vec("USMCA Certification Authority", 64);
		
		assert_ok!(TariffLogic::verify_zk_proof(
			RuntimeOrigin::root(),
			account_id,
			0, // schedule ID
			country_pair.clone(),
			proof_data,
			issuer
		));
		
		// Verify the user now has a valid ZK proof
		assert!(TariffLogic::has_valid_zk_proof(&account_id, 0, &country_pair));
		
		// Now the user should be able to apply a tariff with the preferential rate
		let shipment_value = 50;
		
		assert_ok!(TariffLogic::apply_tariff(
			RuntimeOrigin::signed(account_id),
			0,
			country_pair,
			shipment_value,
			true // use preferential rate
		));
		
		// Verify the correct amount was reserved (2% of 50 = 1)
		assert_eq!(Balances::reserved_balance(account_id), 1);
	});
}

#[test]
fn apply_preferential_tariff_fails_without_zk_proof() {
	new_test_ext().execute_with(|| {
		// Setup a tariff schedule and rate
		let hs_code = [0u8, 2, 0, 1, 1, 0];
		let name = bounded_vec("Beef Products", 64);
		let description = bounded_vec("Tariff description", 256);
		
		assert_ok!(TariffLogic::create_tariff_schedule(
			RuntimeOrigin::root(),
			hs_code,
			name,
			description
		));
		
		let country_pair = create_country_pair(*b"MX", *b"US");
		
		assert_ok!(TariffLogic::set_tariff_rate(
			RuntimeOrigin::root(),
			0,
			country_pair.clone(),
			1000, // 10%
			200,  // 2%
			true  // ZK proof required
		));
		
		// Try to apply a preferential tariff without a ZK proof
		let account_id = 1;
		let shipment_value = 50;
		
		assert_noop!(
			TariffLogic::apply_tariff(
				RuntimeOrigin::signed(account_id),
				0,
				country_pair,
				shipment_value,
				true // try to use preferential rate without ZK proof
			),
			Error::<Test>::ZkProofRequired
		);
	});
}

#[test]
fn set_schedule_status_works() {
	new_test_ext().execute_with(|| {
		// Create a tariff schedule
		let hs_code = [0u8, 2, 0, 1, 1, 0];
		let name = bounded_vec("Beef Products", 64);
		let description = bounded_vec("Tariff schedule for beef", 256);
		
		assert_ok!(TariffLogic::create_tariff_schedule(
			RuntimeOrigin::root(),
			hs_code,
			name,
			description
		));
		
		// Verify it's active by default
		assert!(TariffLogic::tariff_schedules(0).unwrap().active);
		
		// Deactivate the schedule
		assert_ok!(TariffLogic::set_schedule_status(
			RuntimeOrigin::root(),
			0,
			false
		));
		
		// Verify it's now inactive
		assert!(!TariffLogic::tariff_schedules(0).unwrap().active);
		
		// Re-activate the schedule
		assert_ok!(TariffLogic::set_schedule_status(
			RuntimeOrigin::root(),
			0,
			true
		));
		
		// Verify it's active again
		assert!(TariffLogic::tariff_schedules(0).unwrap().active);
		
		// Non-root users cannot change schedule status
		assert_noop!(
			TariffLogic::set_schedule_status(RuntimeOrigin::signed(1), 0, false),
			BadOrigin
		);
		
		// Cannot change status of non-existent schedule
		assert_noop!(
			TariffLogic::set_schedule_status(RuntimeOrigin::root(), 99, false),
			Error::<Test>::TariffScheduleNotFound
		);
	});
} 