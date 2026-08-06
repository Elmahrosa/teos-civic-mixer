import hashlib

def mix_receipt_hash(token_type: str, amount: float, destination_wallet: str = None) -> str:
    content = f"{token_type}:{amount}:{destination_wallet or 'no-destination'}"
    return hashlib.sha256(content.encode()).hexdigest()
