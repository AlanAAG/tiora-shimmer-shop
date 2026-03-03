from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        print("Navigating to product page...")
        page.goto("http://localhost:3000/product/solis-coil-ring", wait_until="networkidle")

        # Click 'Add to Bag'
        print("Clicking 'Add to Bag'...")
        page.click("button:has-text('ADD TO BAG')")

        # Give it a second to add to cart
        page.wait_for_timeout(2000)

        # Click on the cart icon
        print("Opening cart...")
        page.click("button:has([class*='bg-primary'])") # Shopping bag icon
        page.wait_for_timeout(2000)

        print("Clicking Checkout...")

        # The checkout button opens a new tab/window because of target="_blank" in CartDrawer
        with context.expect_page() as new_page_info:
            page.click("button:has-text('Checkout'), a:has-text('Checkout'), button:has-text('CHECKOUT'), a:has-text('CHECKOUT')")

        new_page = new_page_info.value
        print("Waiting for new page to load...")
        new_page.wait_for_load_state()

        url = new_page.url
        print(f"Checkout URL: {url}")

        if "tiora-2025.myshopify.com" in url or "checkout.shopify.com" in url or "shopify" in url:
            print("Successfully navigated to Shopify checkout domain!")
            new_page.screenshot(path="verification/checkout_success_sync.png")
        else:
            print("Failed: Did not navigate to the expected Shopify domain.")
            new_page.screenshot(path="verification/checkout_failure_sync.png")

        browser.close()

if __name__ == "__main__":
    run()
