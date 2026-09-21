import { expect, test, type Page } from '@playwright/test'

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    body: document.body.scrollWidth - document.body.clientWidth,
    root: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }))
  expect(overflow.body).toBeLessThanOrEqual(1)
  expect(overflow.root).toBeLessThanOrEqual(1)
}

async function enterDriveMode(page: Page) {
  await page.getByRole('button', { name: 'Start calibration' }).click()
  await expect(page.getByRole('heading', { name: 'Position the phone.' })).toBeVisible()
  await page.getByRole('button', { name: 'Skip to ready' }).click()
  await expect(page.getByRole('heading', { name: 'Baseline ready.' })).toBeVisible()
  await page.getByRole('button', { name: 'Enter Drive Mode' }).click()
  await expect(page.getByRole('status')).toContainText('ATTENTIVE')
}

test('complete responsive presentation journey has no horizontal overflow', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Ready for demonstration.' })).toBeVisible()
  await expectNoHorizontalOverflow(page)

  await enterDriveMode(page)
  await expectNoHorizontalOverflow(page)

  await page.getByRole('button', { name: 'Simulate critical' }).click()
  await expect(page.getByRole('alertdialog', { name: 'WAKE NOW' })).toBeVisible()
  await expectNoHorizontalOverflow(page)
  await page.getByRole('button', { name: 'Acknowledge alert' }).click()
  await expect(page.getByRole('status')).toContainText('CAUTION')

  await page.getByRole('button', { name: 'End session' }).click()
  await expect(page.getByRole('heading', { name: 'Session complete.' })).toBeVisible()
  await expectNoHorizontalOverflow(page)
  await page.getByRole('button', { name: 'Replay demo' }).click()
  await expect(page.getByRole('heading', { name: 'Ready for demonstration.' })).toBeVisible()
})

test('critical acknowledgement remains inside a 360 by 640 viewport', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 })
  await page.goto('/')
  await enterDriveMode(page)
  await page.getByRole('button', { name: 'Simulate critical' }).click()

  const buttonBox = await page.getByRole('button', { name: 'Acknowledge alert' }).boundingBox()
  expect(buttonBox).not.toBeNull()
  expect(buttonBox!.y).toBeGreaterThanOrEqual(0)
  expect(buttonBox!.y + buttonBox!.height).toBeLessThanOrEqual(640)
})

test('reduced motion removes infinite animations from the critical state', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await enterDriveMode(page)
  await page.getByRole('button', { name: 'Simulate critical' }).click()

  const infiniteAnimations = await page.locator('*').evaluateAll((elements) => elements.filter((element) => {
    const style = getComputedStyle(element)
    return style.animationName !== 'none' && style.animationIterationCount === 'infinite'
  }).length)
  expect(infiniteAnimations).toBe(0)
})

test('keyboard focus is visible and can start the core journey', async ({ page }) => {
  await page.goto('/')
  const start = page.getByRole('button', { name: 'Start calibration' })
  await start.focus()
  await expect(start).toBeFocused()
  const outlineStyle = await start.evaluate((element) => getComputedStyle(element).outlineStyle)
  expect(outlineStyle).not.toBe('none')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'Position the phone.' })).toBeVisible()
})

test('layout remains usable at a zoom-equivalent narrow CSS viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Ready for demonstration.' })).toBeVisible()
  await expectNoHorizontalOverflow(page)
  await expect(page.getByRole('button', { name: 'Start calibration' })).toBeInViewport()
})
