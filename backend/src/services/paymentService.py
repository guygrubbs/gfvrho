"""
paymentService.py

This module integrates with Stripe to verify payment status for gfvrho's tiered reports.
We provide a single function, verify_payment, which checks whether a user has paid
for a given tier of the report.

Best Practices:
1. Store Stripe API keys in a secure location (e.g., AWS Secrets Manager or SSM).
2. Follow Stripe's best practices for verifying payments, possibly using webhooks to track status.
3. In production, add robust error handling and logging, especially around network calls.
"""

import os
import stripe

# Example environment variable for Stripe secret key
STRIPE_SECRET_KEY = os.environ.get("GFVRHO_STRIPE_SECRET_KEY", "CHANGE_ME")
stripe.api_key = STRIPE_SECRET_KEY

def verify_payment(user_id: int, report_tier: int) -> bool:
    """
    Verifies whether the user has made a successful payment for the requested tier.
    In a real scenario, you might:
      1. Look up the user's Stripe customer ID in your database.
      2. Query Stripe for the relevant charge, subscription, or payment intent.
      3. Validate the status is 'succeeded', 'active', etc.

    Here, we demonstrate a simple placeholder call to Stripe's PaymentIntent or Charge retrieval.

    :param user_id: The user's internal ID.
    :param report_tier: The requested tier (2 or 3) that requires payment.
    :return: True if payment is verified, False otherwise.
    """
    # In a real implementation, you might store the relationship between user_id
    # and Stripe customer/subscription IDs in your database. Then retrieve them:
    #   stripe_customer_id = get_user_stripe_customer_id(user_id)
    # And query the relevant payment record in Stripe.

    # This placeholder code simulates a scenario where you check a specific PaymentIntent ID or
    # subscription object in Stripe. We'll simply return True for demonstration.

    if report_tier < 2:
        # Tier 1 might be free, so no payment verification needed, return True by default.
        return True

    # For tier 2 and 3, we do a mock check:
    # Example usage (not actual code):
    #   payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
    #   if payment_intent.status == 'succeeded':
    #       return True
    #   else:
    #       return False

    # For now, we just return True to simulate a successful payment verification.
    return True
