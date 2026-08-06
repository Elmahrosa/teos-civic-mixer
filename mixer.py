import uuid

from badge_verifier import verify_badge
from receipt_layer import mix_receipt_hash
from vault_logger import log_mix

MAX_TEOS = 1_000_000
MAX_ERT = 10_000_000

def invoke_resurrection_mix(badge_id, token_type, amount, destination_wallet=None):
    if not verify_badge(badge_id):
        raise Exception("Badge verification failed. Civic access only.")

    if token_type == "TEOS" and amount > MAX_TEOS:
        raise Exception("Mix rejected: TEOS amount exceeds civic threshold.")
    if token_type == "ERT" and amount > MAX_ERT:
        raise Exception("Mix rejected: ERT amount exceeds civic threshold.")

    mix_id = f"MIX-{uuid.uuid4().hex[:8]}"
    receipt_hash = mix_receipt_hash(token_type, amount, destination_wallet)

    log_mix(mix_id, badge_id, token_type, amount, receipt_hash)

    return {
        "mix_id": mix_id,
        "status": "Logged",
        "receipt_hash": receipt_hash,
        "vault_log": "vault_registry.json",
        "cert_log": "certification_log.md"
    }
