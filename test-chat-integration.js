#!/usr/bin/env node

/**
 * ChatAssistant Backend Integration Test
 * Tests the new ChatAssistant component's connection to the backend API
 */

const API_BASE = "http://localhost:5000";
const API_ENDPOINT = `${API_BASE}/api/chat`;

const testQueries = [
  { lang: "en", query: "Tell me about farmer schemes in India" },
  { lang: "hi", query: "किसान योजनाओं के बारे में बताएं" },
  { lang: "en", query: "What are scholarship schemes available?" },
  { lang: "hi", query: "नौकरी की योजनाएं क्या हैं?" },
];

async function testAPI() {
  console.log("🧪 ChatAssistant Backend Integration Test\n");
  console.log(`Testing API Endpoint: ${API_ENDPOINT}\n`);
  
  let successCount = 0;
  let failureCount = 0;

  for (const test of testQueries) {
    try {
      console.log(`📝 Testing: "${test.query}" (${test.lang.toUpperCase()})`);
      
      const startTime = Date.now();
      
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: test.query }),
      });
      
      const duration = Date.now() - startTime;

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.reply && !data.response && !data.message) {
        throw new Error("No response field in API response");
      }

      const reply = data.reply || data.response || data.message;
      const preview = reply.substring(0, 100).replace(/\n/g, " ");
      
      console.log(`   ✅ Success (${duration}ms)`);
      console.log(`   💬 Response: "${preview}..."\n`);
      
      successCount++;
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}\n`);
      failureCount++;
    }
  }

  console.log("\n📊 Test Summary");
  console.log(`   ✅ Passed: ${successCount}/${testQueries.length}`);
  console.log(`   ❌ Failed: ${failureCount}/${testQueries.length}`);
  
  if (failureCount === 0) {
    console.log("\n🎉 All tests passed! ChatAssistant is ready to use.\n");
  } else {
    console.log("\n⚠️  Some tests failed. Check backend is running and accessible.\n");
  }
}

// Check if backend is reachable before running tests
fetch(API_BASE)
  .then(() => testAPI())
  .catch(() => {
    console.error(`❌ Cannot reach backend at ${API_BASE}`);
    console.error("Make sure backend server is running: node backend/server.js\n");
    process.exit(1);
  });
