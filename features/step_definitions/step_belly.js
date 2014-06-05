importClass(org.openqa.selenium.By);
importClass(org.openqa.selenium.WebDriver);
importClass(org.openqa.selenium.WebElement);
importClass(org.openqa.selenium.htmlunit.HtmlUnitDriver);
importClass(org.openqa.selenium.firefox.FirefoxDriver);
importClass(org.openqa.selenium.firefox.FirefoxDriver);
importClass(org.openqa.selenium.remote.DesiredCapabilities);
importClass(org.openqa.selenium.remote.RemoteWebDriver);
importClass(java.net.MalformedURLException);
importClass(java.net.URL);

function assertEquals(expected, actual) {
    if (expected != actual) {
        throw "Expected " + expected + ", but got " + actual;
    }
}

function assertContains(expectedVal, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == expectedVal) return;
    }
    throw "Expected array containing " + expectedVal + ", but got " + array;
}

Given(/^I have (\d+) cukes in my belly$/, function(arg1) {
        java.lang.System.setProperty("webdriver.firefox.useExisting", "true"); 
        // The Firefox driver supports javascript 
        //var driver = new FirefoxDriver();
	var driver = new RemoteWebDriver(new URL(" http://127.0.0.1:4444/wd/hub"), DesiredCapabilities.firefox()); 
        
        // Go to the Google Suggest home page
        driver.get("http://www.google.com/webhp?complete=1&hl=en");
        
        // Enter the query string "Cheese"
        var query = driver.findElement(By.name("q"));
        query.sendKeys("Cheese");

        // Sleep until the div we want is visible or 5 seconds is over
        var end = java.lang.System.currentTimeMillis() + 5000;
        while (java.lang.System.currentTimeMillis() < end) {
            var resultsDiv = driver.findElement(By.className("gssb_e"));

            // If results have been returned, the results are displayed in a drop down.
            if (resultsDiv.isDisplayed()) {
              break;
            }
        }

        // And now list the suggestions
        var allSuggestions = driver.findElements(By.xpath("//td[@class='gssb_a gbqfsf']"));
        
        for each (var suggestion in allSuggestions.toArray()) {
            print(suggestion.getText());
        }

        driver.quit();

});


When(/^I wait (\d+) hour$/, function(arg1) {
});

Then(/^my belly should growl$/, function() {
	// Create a new instance of the html unit driver
	// Notice that the remainder of the code relies on the interface,
	// not the implementation.
	var driver = new HtmlUnitDriver();

	// And now use this to visit Google
	driver.get("http://www.google.com");

	// Find the text input element by its name
	var element = driver.findElement(By.name("q"));

	// Enter something to search for
	element.sendKeys("Cheese!");

	// Now submit the form. WebDriver will find the form for us from the element
	element.submit();

	// Check the title of the page
	assertEquals("Force test to fail", driver.getTitle());
});

