import hashlib, time

def obfuscate(token_type: str, amount: float, destination_wallet: str = None) -> str:
    secret_string = f"{token_type}-{amount}-{destination_wallet}-{time.time()}"
    return hashlib.sha256(secret_string.encode()).hexdigest()

