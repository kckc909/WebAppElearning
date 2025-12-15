# Test Script for New Backend Modules
# Kiểm tra tất cả các API endpoints mới

$baseUrl = "http://localhost:3000"
$endpoints = @(
    "class-assignments",
    "class-calendar",
    "class-exams",
    "class-exam-results",
    "class-materials",
    "class-students",
    "class-submissions",
    "lesson-contents",
    "content-ides",
    "content-ides-starter"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TESTING BACKEND API ENDPOINTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$results = @()

foreach ($endpoint in $endpoints) {
    $url = "$baseUrl/$endpoint"
    Write-Host "Testing: $url" -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri $url -Method GET -UseBasicParsing -ErrorAction Stop
        $status = $response.StatusCode
        $statusText = "✅ PASS"
        $color = "Green"
        
        $results += [PSCustomObject]@{
            Endpoint = $endpoint
            Status = $status
            Result = "✅ PASS"
        }
        
        Write-Host "  Status: $status - $statusText" -ForegroundColor $color
    }
    catch {
        $status = $_.Exception.Response.StatusCode.Value__
        $statusText = "❌ FAIL"
        $color = "Red"
        
        $results += [PSCustomObject]@{
            Endpoint = $endpoint
            Status = $status
            Result = "❌ FAIL"
        }
        
        Write-Host "  Status: $status - $statusText" -ForegroundColor $color
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TEST SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$results | Format-Table -AutoSize

$passCount = ($results | Where-Object { $_.Result -eq "✅ PASS" }).Count
$failCount = ($results | Where-Object { $_.Result -eq "❌ FAIL" }).Count
$totalCount = $results.Count

Write-Host ""
Write-Host "Total Tests: $totalCount" -ForegroundColor White
Write-Host "Passed: $passCount" -ForegroundColor Green
Write-Host "Failed: $failCount" -ForegroundColor Red
Write-Host ""

if ($failCount -eq 0) {
    Write-Host "🎉 ALL TESTS PASSED! 🎉" -ForegroundColor Green
} else {
    Write-Host "⚠️  SOME TESTS FAILED ⚠️" -ForegroundColor Yellow
}
