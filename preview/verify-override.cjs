const puppeteer = require('puppeteer');

async function testOverride() {
  console.log('=== CSS Override Verification ===\n');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');

  // Test: Check if .Cards gap (My Style System) overrides Tailwind gap
  console.log('1. Checking if .Cards gap overrides Tailwind gap-4...');
  // Tailwind の gap-4 = 1rem = 16px
  // My Style System のデフォルト gap = 30px
  // My Style System が Tailwind よりも後に来るので、30px になるはず

  const cardsGap = await page.evaluate(() => {
    const el = document.querySelector('.Cards');
    return {
      computedGap: window.getComputedStyle(el).gap,
      cssVarGap: getComputedStyle(el).getPropertyValue('--gap').trim()
    };
  });

  console.log(`   - Computed gap: ${cardsGap.computedGap}`);
  console.log(`   - CSS var --gap: ${cardsGap.cssVarGap}`);

  if (cardsGap.computedGap === '30px') {
    console.log('   ✅ My Style System gap が適用されている（Tailwind より優先）');
  } else {
    console.log('   ❌ Tailwind gap が優先されている');
  }

  // Test: Check specific item gap
  console.log('\n2. Checking .item gap (should be 1em = My Style System)...');
  const itemGap = await page.evaluate(() => {
    const items = document.querySelectorAll('.Cards > .item');
    if (items.length === 0) return 'not found';
    return window.getComputedStyle(items[0]).gap;
  });

  console.log(`   - .item gap: ${itemGap}`);
  if (itemGap === '1em' || itemGap === '16px') {
    console.log('   ✅ My Style System .item gap が適用されている');
  }

  // Test: Check if Tailwind classes override My Style System CSS
  console.log('\n3. Checking Tailwind overrides on card contents...');
  const tailwindOverrides = await page.evaluate(() => {
    const card1 = document.querySelector('.bg-blue-500');
    if (!card1) return null;

    return {
      backgroundColor: getComputedStyle(card1).backgroundColor,
      color: getComputedStyle(card1).color,
      padding: getComputedStyle(card1).padding,
      borderRadius: getComputedStyle(card1).borderRadius,
      // Check if My Style System .Cards gap (30px) is on parent
      parentGap: getComputedStyle(card1.parentElement).gap
    };
  });

  console.log(`   - backgroundColor (should be rgb(59, 130, 246)): ${tailwindOverrides.backgroundColor}`);
  console.log(`   - color (should be rgb(255, 255, 255)): ${tailwindOverrides.color}`);
  console.log(`   - padding (should be 2rem / 32px): ${tailwindOverrides.padding}`);
  console.log(`   - borderRadius (should be 0.5rem / 8px): ${tailwindOverrides.borderRadius}`);
  console.log(`   - parent Gap (My Style System .Cards, should be 30px): ${tailwindOverrides.parentGap}`);

  await browser.close();

  console.log('\n=== Summary ===');
  console.log('My Style System (.Cards, .item) は Tailwind より後に定義。');
  console.log('Tailwind クラスは要素内部の装飾に使用可能。');
}

testOverride().catch(console.error);
