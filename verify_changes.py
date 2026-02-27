from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Test 1: Home page reviews section
        print("Navigating to home page...")
        page.goto("http://localhost:3000")

        # Wait for the reviews section to load (it might be further down)
        print("Waiting for reviews section...")
        # Scroll to bottom to ensure lazy loaded components are triggered
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(2000) # Wait for potential lazy loading

        # Take screenshot of the home page reviews section
        # We look for the section with "Five Star Reviews"
        try:
            reviews_header = page.get_by_text("115+ Five Star Reviews")
            reviews_header.scroll_into_view_if_needed()
            page.wait_for_timeout(1000)
            page.screenshot(path="verification_home.png", full_page=False)
            print("Home page screenshot taken.")
        except Exception as e:
            print(f"Error finding reviews on home page: {e}")

        # Test 2: Reviews page
        print("Navigating to reviews page...")
        page.goto("http://localhost:3000/reviews")
        page.wait_for_timeout(2000)

        # Take screenshot of the reviews page grid
        page.screenshot(path="verification_reviews_page.png", full_page=False)
        print("Reviews page screenshot taken.")

        # Inspect video attributes on Reviews page
        videos = page.locator("video")
        count = videos.count()
        print(f"Found {count} videos on reviews page.")

        for i in range(count):
            video = videos.nth(i)
            # Check attributes
            is_muted = video.evaluate("el => el.muted")
            is_loop = video.evaluate("el => el.loop")
            is_autoplay = video.evaluate("el => el.autoplay")
            is_playsinline = video.evaluate("el => el.playsInline")

            print(f"Video {i}: Muted={is_muted}, Loop={is_loop}, AutoPlay={is_autoplay}, PlaysInline={is_playsinline}")

            if not (is_muted and is_loop and is_autoplay and is_playsinline):
                print(f"WARNING: Video {i} missing attributes!")

        # Verify Favicon (by checking head)
        favicon = page.locator('link[rel="icon"]')
        href = favicon.get_attribute("href")
        print(f"Favicon href: {href}")

        browser.close()

if __name__ == "__main__":
    verify_changes()
