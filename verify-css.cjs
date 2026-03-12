const puppeteer = require('puppeteer');

async function testCSS() {
  console.log('=== CSS Verification Start ===\n');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');

  // Test 1: Check Cards gap CSS variable
  console.log('1. Checking Cards gap...');
  const gap = await page.evaluate(() => {
    const el = document.querySelector('.Cards');
    return {
      computedGap: window.getComputedStyle(el).gap,
      gapVar: getComputedStyle(el).getPropertyValue('--gap').trim()
    };
  });
  console.log('   - Computed gap:', gap.computedGap);
  console.log('   - CSS var --gap:', gap.gapVar);

  // Test 2: Check Tailwind bg-blue-500
  console.log('\n2. Checking Tailwind bg-blue-500...');
  const bgColor = await page.evaluate(() => {
    const el = document.querySelector('.bg-blue-500');
    if (!el) return { exists: false };
    return {
      exists: true,
      computedBg: window.getComputedStyle(el).backgroundColor,
      computedColor: window.getComputedStyle(el).color,
      className: el.className
    };
  });
  console.log('   - Element exists:', bgColor.exists);
  if (bgColor.exists) {
    console.log('   - Computed background-color:', bgColor.computedBg);
    console.log('   - Computed color:', bgColor.computedColor);
    console.log('   - Full className:', bgColor.className);
  }

  // Test 3: Check multiple Tailwind classes
  console.log('\n3. Checking multiple Tailwind utilities...');
  const utilities = await page.evaluate(() => {
    const tests = [
      { selector: '.bg-blue-500', prop: 'backgroundColor', expected: 'rgb(59, 130, 246)' },
      { selector: '.text-white', prop: 'color', expected: 'rgb(255, 255, 255)' },
      { selector: '.p-8', prop: 'padding', expected: '2rem' },
      { selector: '.rounded-lg', prop: 'borderRadius', expected: '0.5rem' },
      { selector: '.shadow-lg', prop: 'boxShadow', expected: '0px' }, // shadow is complex
      { selector: '.h-64', prop: 'height', expected: '16rem' },
      { selector: '.w-full', prop: 'width', expected: '100%' },
    ];

    return tests.map(({ selector, prop, expected }) => {
      const el = document.querySelector(selector);
      if (!el) return { selector, exists: false, computed: null };
      const computed = window.getComputedStyle(el)[prop];
      return {
        selector,
        exists: true,
        computed,
        expected,
        matches: computed === expected
      };
    });
  });

  utilities.forEach(test => {
    const status = test.exists ? (test.matches ? '✓' : '✗') : 'N/A';
    console.log(`   ${status} ${test.selector}: ${test.exists ? test.computed : 'not found'}`);
  });

  await browser.close();

  // Summary
  const allPassed = utilities.every(t => !t.exists || t.matches);
  console.log('\n=== Summary ===');
  console.log(allPassed ? 'All Tailwind utilities are working!' : 'Some utilities not working.');
}

testCSS().catch(console.error);
