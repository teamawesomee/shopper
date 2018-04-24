const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : 'pk_test_I4irKTfvhc4aXA6UzFIOvueM';

export default STRIPE_PUBLISHABLE;
