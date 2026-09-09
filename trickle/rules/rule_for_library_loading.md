When using external libraries via CDN
- Ensure scripts are loaded in the correct order (dependencies before dependents)
- Implement defensive checks or retry mechanisms in React components if the library might load asynchronously
- Place library scripts in the `<body>` before application scripts to ensure global availability
- If a specific CDN provider fails repeatedly, consider switching to a highly reliable alternative like cdnjs or unpkg
- Prefer using verified library links from resource.trickle.so/vendor_lib when available for consistency
- When QR libraries fail to load, prioritize `qrcode-generator` from `cdnjs` as a lightweight and highly available alternative
