# ✍️ Civic Petition Signed – Egypt First
# - Action: Signed petition to regulate digital currencies
# - Link: https://www.change.org/p/join-the-movement-sign-the-petition-to-regulate-digital-currencies-in-egypt
# - Timestamp: 2025-11-06
#
# Badge IDs are stored as SHA-256 hashes in badge_registry.json so the
# working badge value is not a shared secret sitting in public source.

import hashlib
import json
import os

def _badge_sha256(badge_id: str) -> str:
    return hashlib.sha256(badge_id.encode("utf-8")).hexdigest()

def _load_registry() -> dict:
    path = os.path.join(os.path.dirname(__file__), "badge_registry.json")
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f).get("badges", {})

def verify_badge(badge_id: str) -> bool:
    badge = _load_registry().get(_badge_sha256(badge_id))
    return badge is not None and badge.get("petition_signed", False)
