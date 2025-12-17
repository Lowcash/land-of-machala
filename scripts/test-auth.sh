#!/bin/bash

# Test Authentication Flow
# This script tests registration, login, and guest mode

BASE_URL="http://localhost:3000"

echo "🔐 Testing Authentication Flow"
echo "================================"

# Test 1: Register new user
echo ""
echo "📝 Test 1: Register new user"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@test.com",
    "password": "password123",
    "name": "New Test User"
  }')

echo "Response: $REGISTER_RESPONSE"

if echo "$REGISTER_RESPONSE" | grep -q "success\|vytvořen"; then
  echo "✅ Registration successful"
else
  echo "❌ Registration failed"
fi

# Test 2: Create guest account
echo ""
echo "👤 Test 2: Create guest account"
GUEST_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/guest")
echo "Response: $GUEST_RESPONSE"

if echo "$GUEST_RESPONSE" | grep -q "email\|password"; then
  echo "✅ Guest account creation successful"
  GUEST_EMAIL=$(echo "$GUEST_RESPONSE" | grep -o '"email":"[^"]*' | cut -d'"' -f4)
  echo "Guest email: $GUEST_EMAIL"
else
  echo "❌ Guest account creation failed"
fi

echo ""
echo "================================"
echo "✅ Authentication API tests complete"
echo ""
echo "Manual steps to complete:"
echo "1. Open http://localhost:3000/register"
echo "2. Register with test credentials"
echo "3. Login at http://localhost:3000/login"
echo "4. Create character at /onboarding"
echo "5. Verify redirect to /character"
echo "6. Test guest login button"
