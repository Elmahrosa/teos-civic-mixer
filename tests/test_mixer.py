import mixer
from receipt_layer import mix_receipt_hash


def test_invalid_badge_rejected():
    try:
        mixer.invoke_resurrection_mix("not-a-badge", "TEOS", 100)
        assert False, "expected exception"
    except Exception as e:
        assert "Badge verification" in str(e)


def test_teos_over_threshold_rejected():
    try:
        mixer.invoke_resurrection_mix("ElMahrosa-verified", "TEOS", 1_000_001)
        assert False, "expected exception"
    except Exception as e:
        assert "TEOS amount exceeds" in str(e)


def test_ert_over_threshold_rejected():
    try:
        mixer.invoke_resurrection_mix("ElMahrosa-verified", "ERT", 10_000_001)
        assert False, "expected exception"
    except Exception as e:
        assert "ERT amount exceeds" in str(e)


def test_mix_id_has_hex_prefix_and_logs(monkeypatch):
    calls = {}
    monkeypatch.setattr(mixer, "log_mix", lambda *a, **k: calls.update(args=a, kwargs=k))
    result = mixer.invoke_resurrection_mix(
        "ElMahrosa-verified", "TEOS", 500, destination_wallet="wallet-A"
    )
    assert result["mix_id"].startswith("MIX-")
    assert calls["args"][1] == "ElMahrosa-verified"
    assert calls["args"][2] == "TEOS"


def test_receipt_hash_wired_into_result(monkeypatch):
    monkeypatch.setattr(mixer, "log_mix", lambda *a, **k: None)
    result = mixer.invoke_resurrection_mix(
        "ElMahrosa-verified", "ERT", 2500, destination_wallet="wallet-B"
    )
    assert len(result["receipt_hash"]) == 64


def test_mix_receipt_hash_is_reproducible():
    a = mix_receipt_hash("TEOS", 100, "wallet-A")
    b = mix_receipt_hash("TEOS", 100, "wallet-A")
    assert a == b
    assert a != mix_receipt_hash("TEOS", 101, "wallet-A")
