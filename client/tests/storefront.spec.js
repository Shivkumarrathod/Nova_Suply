import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test('auth-gated cart and demo checkout flow', async ({ page }, testInfo) => {
  await expect(page.getByRole('heading', { name: /less, but/i })).toBeVisible()
  await expect(page.getByRole('article')).toHaveCount(3)
  await page.screenshot({ path: testInfo.outputPath('storefront-home.png'), fullPage: true })

  await page.getByRole('button', { name: /add to cart/i }).first().click()
  await expect(page.getByRole('dialog', { name: /sign in to continue/i })).toBeVisible()
  await page.getByRole('button', { name: /continue with phone/i }).click()
  await expect(page.getByRole('button', { name: /cart with 1 items/i })).toBeVisible()

  await page.getByRole('button', { name: /nova member/i }).click()
  await page.getByRole('button', { name: /addresses/i }).click()
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
