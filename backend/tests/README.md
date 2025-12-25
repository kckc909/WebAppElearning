# Backend API Tests

This folder contains HTTP test files for testing backend APIs.

## Test Files

- `test-invoice-api.http` - Invoice system tests
- `test-payment-flow.http` - Payment flow tests  
- `test-stats-api.http` - Statistics API tests

## How to Use

1. Install REST Client extension in VS Code
2. Open any `.http` file
3. Click "Send Request" above each request
4. View response in the panel

## Requirements

- Backend server running on http://localhost:4000
- Valid user_id in headers (x-user-id)
- Test data in database
