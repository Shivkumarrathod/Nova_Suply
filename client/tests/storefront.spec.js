import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test('auth-gated cart and demo checkout flow', async ({ page }, testInfo) => {
  await expect(page.getByRole('heading', { name: /kitchen essentials/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /cart with/i })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: /best sellers/i })).toBeVisible()
  const expectedBestSellers = testInfo.project.name.includes('mobile') ? 4 : 5
  await expect(page.getByRole('article')).toHaveCount(expectedBestSellers)
  await page.waitForTimeout(500)
  await page.screenshot({ path: testInfo.outputPath('home-page.png'), fullPage: true })
  await page.getByRole('button', { name: /view all products/i }).click()
  await expect(page).toHaveURL(/\/products$/)
  await expect(page.getByRole('heading', { name: /oils for every/i })).toBeVisible()
  await expect(page.getByRole('article')).toHaveCount(10)

  await page.getByRole('button', { name: 'Ghee', exact: true }).click()
  await expect(page.getByRole('article')).toHaveCount(2)
  await page.getByRole('button', { name: 'All', exact: true }).click()
  await page.getByRole('textbox', { name: /search products/i }).fill('avocado')
  await expect(page.getByRole('article')).toHaveCount(1)
  await expect(page.getByRole('heading', { name: /avocado cooking oil/i })).toBeVisible()
  await page.getByRole('textbox', { name: /search products/i }).clear()
  await page.waitForTimeout(800)
  await page.screenshot({ path: testInfo.outputPath('products-page.png'), fullPage: true })

  await page.getByRole('button', { name: /add .* to cart/i }).first().click()
  await expect(page.getByRole('dialog', { name: /sign in to continue/i })).toBeVisible()
  await page.getByRole('button', { name: /continue with phone/i }).click()
  await expect(page.getByRole('button', { name: /cart with 1 items/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /increase sunflower gold oil quantity/i })).toBeVisible()
  await page.getByRole('button', { name: /increase sunflower gold oil quantity/i }).click()
  await expect(page.getByRole('button', { name: /cart with 2 items/i })).toBeVisible()
  await page.getByRole('button', { name: /decrease sunflower gold oil quantity/i }).click()
  await expect(page.getByRole('button', { name: /cart with 1 items/i })).toBeVisible()
  await page.screenshot({ path: testInfo.outputPath('floating-cart.png'), fullPage: true })

  await page.getByRole('button', { name: /nova member/i }).click()
  await page.getByRole('button', { name: /view profile/i }).click()
  await expect(page.getByText(/verified member/i)).toBeVisible()
  await page.screenshot({ path: testInfo.outputPath('profile-panel.png'), fullPage: true })
  await page.getByRole('button', { name: /saved addresses/i }).click()
  await expect(page.getByText(/48 market street/i)).toBeVisible()
  await page.getByRole('button', { name: /close panel/i }).click()

  await page.getByRole('button', { name: /cart with 1 items/i }).click()
  await expect(page.getByRole('complementary', { name: /shopping cart/i })).toBeVisible()
  await page.getByRole('button', { name: /place demo order/i }).click()
  await expect(page.getByText(/order confirmed/i)).toBeVisible()
  await page.getByRole('button', { name: /view orders/i }).click()
  await expect(page.getByText(/preparing/i)).toBeVisible()

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  expect(overflow).toBe(false)
  await page.screenshot({ path: testInfo.outputPath('storefront.png'), fullPage: true })
})

test('products page loads directly', async ({ page }) => {
  await page.goto('/products')
  await expect(page.getByRole('heading', { name: /oils for every/i })).toBeVisible()
  await expect(page.getByRole('article')).toHaveCount(10)

  const firstCard = await page.getByRole('article').nth(0).boundingBox()
  const secondCard = await page.getByRole('article').nth(1).boundingBox()
  expect(Math.abs(firstCard.y - secondCard.y)).toBeLessThan(2)
})
