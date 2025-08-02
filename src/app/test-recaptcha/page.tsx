'use client';

import { useEffect, useState } from 'react';

/* eslint-disable no-console */

/**
 * Test reCAPTCHA page component for debugging and testing
 * Provides a testing interface for reCAPTCHA functionality including script loading,
 * token generation, and error handling. Includes comprehensive debugging information
 * and manual script loading capabilities for development and troubleshooting purposes.
 * Handles client-side rendering and provides detailed feedback for reCAPTCHA integration.
 * 
 * This page is used for:
 * - Testing reCAPTCHA script loading
 * - Verifying token generation
 * - Debugging integration issues
 * - Manual script loading when automatic loading fails
 */
export default function TestRecaptchaPage() {
  // State management for test results and loading status
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  
  // Get reCAPTCHA site key from environment variables
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  /**
   * Load reCAPTCHA script manually when component mounts
   * Handles both automatic and manual script loading scenarios
   */
  useEffect(() => {
    const loadRecaptchaScript = () => {
      if (typeof window !== 'undefined' && !window.grecaptcha) {
        const script = document.createElement('script');
        // Load reCAPTCHA v3 with the correct URL format
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          console.log('reCAPTCHA script loaded successfully');
          setRecaptchaLoaded(true);
        };
        script.onerror = (error) => {
          console.error('Failed to load reCAPTCHA script:', error);
        };
        document.head.appendChild(script);
      } else if (window.grecaptcha) {
        // Script already loaded
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptchaScript();
  }, [siteKey]);

  /**
   * Display comprehensive debug information in development environment
   * Logs all relevant reCAPTCHA configuration and status information
   */
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('=== reCAPTCHA Test Page Debug ===');
      console.log('Site Key:', siteKey);
      console.log('Site Key type:', typeof siteKey);
      console.log('Site Key length:', siteKey ? siteKey.length : 0);
      console.log('Recaptcha Loaded:', recaptchaLoaded);
      console.log('Window grecaptcha:', typeof window !== 'undefined' ? typeof window.grecaptcha : 'undefined');
      console.log('================================');
    }
  }, [recaptchaLoaded, siteKey]);

  /**
   * Display page load status after a delay
   * Provides initial status information to the user
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      const windowGrecaptcha = typeof window !== 'undefined' ? typeof window.grecaptcha : 'undefined';
      setTestResult(`Site Key: ${siteKey ? 'Set' : 'Not Set'}\nRecaptcha Loaded: ${recaptchaLoaded}\nWindow grecaptcha: ${windowGrecaptcha}`);
    }, 1000);

    return () => clearTimeout(timer);
  }, [recaptchaLoaded, siteKey]);

  /**
   * Test reCAPTCHA functionality with comprehensive error handling
   * Attempts to generate a token and provides detailed feedback
   */
  const testRecaptcha = async () => {
    if (!window.grecaptcha) {
      setTestResult('Error: reCAPTCHA not loaded');
      return;
    }

    setIsLoading(true);
    try {
      // Add comprehensive debug information
      console.log('=== reCAPTCHA Debug Info ===');
      console.log('window.grecaptcha:', window.grecaptcha);
      // @ts-ignore - grecaptcha is loaded dynamically
      console.log('window.grecaptcha.ready:', typeof window.grecaptcha.ready);
      // @ts-ignore - grecaptcha is loaded dynamically
      console.log('window.grecaptcha.execute:', typeof window.grecaptcha.execute);
      // @ts-ignore - grecaptcha is loaded dynamically
      console.log('window.grecaptcha.render:', typeof window.grecaptcha.render);
      console.log('Site Key:', siteKey);
      console.log('============================');

      // Wait for reCAPTCHA initialization to complete
      // @ts-ignore - grecaptcha is loaded dynamically
      if (window.grecaptcha.ready) {
        console.log('Using ready callback...');
        // @ts-ignore - grecaptcha is loaded dynamically
        window.grecaptcha.ready(async () => {
          console.log('Ready callback executed');
          
          // Wait for execute function to become available with retry logic
          let attempts = 0;
          const maxAttempts = 10;
          
          const waitForExecute = () => {
            // @ts-ignore - grecaptcha is loaded dynamically
            if (window.grecaptcha.execute && typeof window.grecaptcha.execute === 'function') {
              console.log('Execute function is now available');
              try {
                // @ts-ignore - grecaptcha is loaded dynamically
                window.grecaptcha.execute(siteKey, { action: 'test' }).then((token: string) => {
                  console.log('Token generated successfully');
                  setTestResult(`Success! Token: ${token.substring(0, 50)}...`);
                  setIsLoading(false);
                }).catch((error: unknown) => {
                  console.error('reCAPTCHA execute failed:', error);
                  setTestResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
                  setIsLoading(false);
                });
              } catch (error) {
                console.error('reCAPTCHA execute failed:', error);
                setTestResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
                setIsLoading(false);
              }
            } else if (attempts < maxAttempts) {
              attempts++;
              console.log(`Execute function not ready, attempt ${attempts}/${maxAttempts}`);
              setTimeout(waitForExecute, 500);
            } else {
              console.error('Execute function never became available');
              setTestResult('Error: reCAPTCHA execute function not available after waiting');
              setIsLoading(false);
            }
          };
          
          waitForExecute();
        });
      } else {
        console.log('No ready callback, trying direct execution...');
        // Direct execution if ready callback is not available
        // @ts-ignore - grecaptcha is loaded dynamically
        const token = await window.grecaptcha.execute(siteKey, { action: 'test' });
        console.log('Token generated successfully (direct)');
        setTestResult(`Success! Token: ${token.substring(0, 50)}...`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('reCAPTCHA test failed:', error);
      setTestResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsLoading(false);
    }
  };

  /**
   * Manual script loading function for troubleshooting
   * Allows users to manually trigger script loading if automatic loading fails
   */
  const loadRecaptchaScript = () => {
    if (typeof window !== 'undefined' && !window.grecaptcha) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('reCAPTCHA script loaded manually');
        setRecaptchaLoaded(true);
      };
      document.head.appendChild(script);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Main container for test interface */}
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Page title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">reCAPTCHA Test Page</h1>
        
        {/* Test controls and status display */}
        <div className="space-y-4">
          {/* Current status display */}
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="font-semibold mb-2">Current Status:</h2>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">{testResult}</pre>
          </div>

          {/* Test reCAPTCHA button */}
          <button
            onClick={testRecaptcha}
            disabled={!recaptchaLoaded || isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Testing...' : 'Test reCAPTCHA'}
          </button>

          {/* Manual script loading button */}
          <button
            onClick={loadRecaptchaScript}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Load reCAPTCHA Script Manually
          </button>

          {/* Test result display */}
          {testResult && (
            <div className="bg-gray-50 p-4 rounded">
              <h2 className="font-semibold mb-2">Test Result:</h2>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">{testResult}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 