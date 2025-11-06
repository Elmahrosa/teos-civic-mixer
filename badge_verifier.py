VERIFIED_BADGE_REGISTRY = ["ElMahrosa-verified"]

def verify_badge(badge_id: str) -> bool:
    return badge_id in VERIFIED_BADGE_REGISTRY

