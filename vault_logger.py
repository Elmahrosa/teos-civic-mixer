import json
import os
from datetime import datetime, timedelta, timezone

CREDENTIALS_FILE = "firebase_credentials.json"

_firebase_app = None


def _get_firebase_app():
    global _firebase_app
    if _firebase_app is not None:
        return _firebase_app
    import firebase_admin
    from firebase_admin import credentials
    if not os.path.exists(CREDENTIALS_FILE):
        raise FileNotFoundError(
            f"Firebase credentials file '{CREDENTIALS_FILE}' is missing. "
            "Place it in the project root (it is gitignored) or set up "
            "the FIREBASE_CREDENTIALS JSON before running the mixer."
        )
    cred = credentials.Certificate(CREDENTIALS_FILE)
    _firebase_app = firebase_admin.initialize_app(cred)
    return _firebase_app


def _lock_file(path):
    lock_path = path + ".lock"
    fd = os.open(lock_path, os.O_CREAT | os.O_RDWR)
    os.write(fd, b"\0")
    try:
        if os.name == "nt":
            import msvcrt
            os.lseek(fd, 0, os.SEEK_SET)
            msvcrt.locking(fd, msvcrt.LK_LOCK, 1)
        else:
            import fcntl
            fcntl.flock(fd, fcntl.LOCK_EX)
        return fd
    except Exception:
        os.close(fd)
        raise


def _unlock_file(fd):
    try:
        if os.name == "nt":
            import msvcrt
            os.lseek(fd, 0, os.SEEK_SET)
            msvcrt.locking(fd, msvcrt.LK_UNLCK, 1)
        else:
            import fcntl
            fcntl.flock(fd, fcntl.LOCK_UN)
    finally:
        os.close(fd)


def _get_db():
    from firebase_admin import firestore
    return firestore.client(_get_firebase_app())


def log_mix(mix_id, badge_id, token_type, amount, receipt_hash=None):
    cairo_tz = timezone(timedelta(hours=2))
    timestamp = datetime.now(cairo_tz).isoformat()

    mix_entry = {
        "mix_id": mix_id,
        "token": token_type,
        "amount": amount,
        "badge": badge_id,
        "timestamp": timestamp
    }
    if receipt_hash:
        mix_entry["receipt_hash"] = receipt_hash

    db = _get_db()
    db.collection("resurrection_mixes").document(mix_id).set(mix_entry)

    fd = _lock_file("vault_registry.json")
    try:
        try:
            with open("vault_registry.json", "r", encoding="utf-8") as f:
                data = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            data = {"mixes": []}
        data.setdefault("mixes", []).append(mix_entry)
        with open("vault_registry.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
    finally:
        _unlock_file(fd)

    with open("certification_log.md", "a", encoding="utf-8") as f:
        f.write(
            f"\n## {mix_id}\n"
            f"- Badge: {badge_id}\n- Token: {token_type}\n- Amount: {amount}\n"
            f"- Timestamp: {timestamp}\n- Status: Verified\n"
        )

    with open("chapter_resurrection.md", "a", encoding="utf-8") as f:
        f.write(
            f"\n- Mix ID: {mix_id}\n"
            f"  - Token: {token_type}\n  - Amount: {amount}\n"
            f"  - Badge: {badge_id}\n  - Timestamp: {timestamp}\n"
            f"  - Status: Logged\n"
        )
