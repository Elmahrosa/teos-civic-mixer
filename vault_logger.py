import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("firebase_credentials.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

import json, firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime, timezone, timedelta

cred = credentials.Certificate("firebase_credentials.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def log_mix(mix_id, badge_id, token_type, amount):
    cairo_tz = timezone(timedelta(hours=2))
    timestamp = datetime.now(cairo_tz).isoformat()

    mix_entry = {
        "mix_id": mix_id,
        "token": token_type,
        "amount": amount,
        "badge": badge_id,
        "timestamp": timestamp
    }

    db.collection("resurrection_mixes").document(mix_id).set(mix_entry)

    try:
        with open("vault_registry.json", "r+") as f:
            data = json.load(f)
            data["mixes"].append(mix_entry)
            f.seek(0)
            json.dump(data, f, indent=2)
    except:
        with open("vault_registry.json", "w") as f:
            json.dump({"mixes": [mix_entry]}, f, indent=2)

    with open("certification_log.md", "a") as f:
        f.write(f"\n## {mix_id}\n- Badge: {badge_id}\n- Token: {token_type}\n- Amount: {amount}\n- Timestamp: {timestamp}\n- Status: Verified\n")

    with open("chapter_resurrection.md", "a") as f:
        f.write(f"\n- Mix ID: {mix_id}\n  - Token: {token_type}\n  - Amount: {amount}\n  - Badge: {badge_id}\n  - Timestamp: {timestamp}\n  - Status: Logged\n")

