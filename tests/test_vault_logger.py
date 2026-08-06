import json

import vault_logger


class FakeFirestoreDoc:
    def set(self, data):
        self.data = data
        return None


class FakeFirestoreCollection:
    def document(self, mix_id):
        return FakeFirestoreDoc()


class FakeFirestore:
    def client(self, app=None):
        return self

    def collection(self, name):
        return FakeFirestoreCollection()


def test_log_mix_writes_registry_and_cert_log(tmp_path, monkeypatch):
    monkeypatch.setattr(vault_logger, "firestore", FakeFirestore())
    monkeypatch.setattr(vault_logger, "_get_firebase_app", lambda: object())
    monkeypatch.chdir(tmp_path)

    vault_logger.log_mix("MIX-abc123", "ElMahrosa-verified", "TEOS", 100)

    data = json.loads(tmp_path.joinpath("vault_registry.json").read_text())
    assert data["mixes"][0]["mix_id"] == "MIX-abc123"
    assert data["mixes"][0]["token"] == "TEOS"
    assert data["mixes"][0]["amount"] == 100

    cert = tmp_path.joinpath("certification_log.md").read_text()
    assert "MIX-abc123" in cert

    res = tmp_path.joinpath("chapter_resurrection.md").read_text()
    assert "MIX-abc123" in res


def test_log_mix_appends_second_entry(tmp_path, monkeypatch):
    monkeypatch.setattr(vault_logger, "firestore", FakeFirestore())
    monkeypatch.setattr(vault_logger, "_get_firebase_app", lambda: object())
    monkeypatch.chdir(tmp_path)

    vault_logger.log_mix("MIX-1", "ElMahrosa-verified", "TEOS", 10)
    vault_logger.log_mix("MIX-2", "ElMahrosa-verified", "ERT", 20)

    data = json.loads(tmp_path.joinpath("vault_registry.json").read_text())
    assert len(data["mixes"]) == 2
    assert [m["mix_id"] for m in data["mixes"]] == ["MIX-1", "MIX-2"]
