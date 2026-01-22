#!/bin/bash

# Route Testing Script for Land of Machala
# Tests all game routes to verify they're accessible

echo "🧪 Testing Game Routes..."
echo "=========================="
echo ""

BASE_URL="http://localhost:3000"

test_route() {
  local route=$1
  local name=$2
  
  # Check if route returns valid HTML (200 status)
  status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$route")
  
  if [ "$status" = "200" ]; then
    echo "✅ $name ($route) - Status: $status"
  else
    echo "❌ $name ($route) - Status: $status"
  fi
}

# Test all game routes
echo "📍 Testing Game Routes:"
test_route "/character" "Character Page"
test_route "/skills" "Skills Page"
test_route "/quests" "Quests Page"
test_route "/inventory" "Inventory Page"
test_route "/map" "Map Page"
test_route "/combat" "Combat Page"
test_route "/game" "Game Root (should redirect to /character)"

echo ""
echo "📍 Testing Auth Routes:"
test_route "/register" "Register Page"
test_route "/login" "Login Page"
test_route "/onboarding" "Onboarding Page"

echo ""
echo "📍 Testing API Routes:"
status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/auth/session")
echo "Session endpoint: $status"

echo ""
echo "✨ All route tests complete!"
echo ""
echo "Next steps:"
echo "1. Open http://localhost:3000 in browser"
echo "2. Register new account"
echo "3. Login"
echo "4. Complete onboarding"
echo "5. Test footer navigation by clicking each button"
echo "6. Verify no errors appear in browser console"
