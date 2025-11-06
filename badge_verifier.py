# ✍️ Civic Petition Signed – Egypt First
# - Contributor: ElMahrosa-verified
# - Action: Signed petition to regulate digital currencies
# - Link: https://www.change.org/p/join-the-movement-sign-the-petition-to-regulate-digital-currencies-in-egypt
# - Timestamp: 2025-11-06

VERIFIED_BADGE_REGISTRY = {
    "ElMahrosa-verified": {
        "petition_signed": True
    }
}

def verify_badge(badge_id: str) -> bool:
    badge = VERIFIED_BADGE_REGISTRY.get(badge_id)
    return badge is not None and badge.get("petition_signed", False)
