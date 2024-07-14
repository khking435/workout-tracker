import pytest
from models import User
from services.user_service import UserService

def test_create_user(session):
    data = {'username': 'testuser', 'email': 'testuser@example.com', 'password': 'password123'}
    user = UserService.create_user(data)
    assert user.id is not None
    assert user.username == 'testuser'

def test_get_user_by_id(session):
    data = {'username': 'johndoe', 'email': 'johndoe@example.com', 'password': 'password123'}
    user = UserService.create_user(data)
    retrieved_user = UserService.get_user_by_id(user.id)
    assert retrieved_user.username == 'johndoe'

def test_get_all_users(session):
    users = UserService.get_all_users()
    assert len(users) > 0

def test_update_user(session):
    data = {'username': 'janedoe', 'email': 'janedoe@example.com', 'password': 'password123'}
    user = UserService.create_user(data)
    update_data = {'username': 'janedoe', 'email': 'jane.doe@example.com'}
    updated_user = UserService.update_user(user.id, update_data)
    assert updated_user.email == 'jane.doe@example.com'

def test_delete_user(session):
    data = {'username': 'markdoe', 'email': 'markdoe@example.com', 'password': 'password123'}
    user = UserService.create_user(data)
    deleted_user = UserService.delete_user(user.id)
    assert deleted_user is not None
    assert UserService.get_user_by_id(user.id) is None
