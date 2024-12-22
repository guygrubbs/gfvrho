# backend/src/tests/services/paymentService.test.py

import pytest
from unittest.mock import patch, MagicMock
from services.paymentService import verify_payment


# Test: Successful Payment Verification
@patch("services.paymentService.stripe.PaymentIntent.retrieve")
def test_verify_payment_success(mock_retrieve):
    """
    Test successful payment verification.
    """
    # Mock Stripe PaymentIntent response
    mock_retrieve.return_value = MagicMock(
        id="pi_123456789",
        status="succeeded",
        metadata={"user_id": "1", "report_tier": "2"}
    )

    result = verify_payment(user_id=1, report_tier=2)
    assert result is True


# Test: Failed Payment Verification (Payment Intent Failed)
@patch("services.paymentService.stripe.PaymentIntent.retrieve")
def test_verify_payment_failed_status(mock_retrieve):
    """
    Test payment verification failure due to unsuccessful payment status.
    """
    mock_retrieve.return_value = MagicMock(
        id="pi_987654321",
        status="failed",
        metadata={"user_id": "1", "report_tier": "2"}
    )

    result = verify_payment(user_id=1, report_tier=2)
    assert result is False


# Test: Failed Payment Verification (Mismatched Metadata)
@patch("services.paymentService.stripe.PaymentIntent.retrieve")
def test_verify_payment_metadata_mismatch(mock_retrieve):
    """
    Test payment verification failure due to mismatched metadata.
    """
    mock_retrieve.return_value = MagicMock(
        id="pi_567890123",
        status="succeeded",
        metadata={"user_id": "2", "report_tier": "1"}
    )

    result = verify_payment(user_id=1, report_tier=2)
    assert result is False


# Test: Payment Verification Exception
@patch("services.paymentService.stripe.PaymentIntent.retrieve")
def test_verify_payment_exception(mock_retrieve):
    """
    Test payment verification failure due to an exception.
    """
    mock_retrieve.side_effect = Exception("Stripe API error")

    result = verify_payment(user_id=1, report_tier=2)
    assert result is False
