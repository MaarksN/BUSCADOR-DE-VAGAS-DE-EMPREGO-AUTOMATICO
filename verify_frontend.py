from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Open the local file directly
        file_path = os.path.abspath("online-app/index.html")
        page.goto(f"file://{file_path}")

        # Check if the page loaded and key elements are present
        page.wait_for_selector("#apiUrl")
        page.wait_for_selector("#searchBtn")

        # Take a screenshot
        page.screenshot(path="/home/jules/verification/frontend_check.png")
        print("Screenshot saved to /home/jules/verification/frontend_check.png")

        browser.close()

if __name__ == "__main__":
    run()
