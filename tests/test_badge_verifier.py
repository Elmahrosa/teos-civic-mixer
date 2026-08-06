import hashlib

from badge_verifier import _badge_sha256, verify_badge


def test_known_badge_is_verified():
    assert verify_badge("ElMahrosa-verified") is True


def test_unknown_badge_is_rejected():
    assert verify_badge("not-a-real-badge") is False


def test_registry_uses_hashed_badge_ids():
    assert _badge_sha256("ElMahrosa-verified") == hashlib.sha256(
        "ElMahrosa-verified".encode("utf-8")
    ).hexdigest()
