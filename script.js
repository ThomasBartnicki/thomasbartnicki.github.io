// RGB to HSL conversion function
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l;
  
    if (max === min) {
      h = 0;
    } else if (max === r) {
      h = 60 * ((g - b) / (max - min));
    } else if (max === g) {
      h = 60 * (2 + (b - r) / (max - min));
    } else if (max === b) {
      h = 60 * (4 + (r - g) / (max - min));
    }
  
    if (h < 0) {
      h += 360;
    }
  
    l = (max + min) / 2;
  
    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = (max - min) / (2 * l);
    } else {
      s = (max - min) / (2 - 2 * l);
    }
  
    h = Math.round(h);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
  
    return [h, s, l];
  }
  
  // Hex to RGB conversion function
  function hexToRgb(hex) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
  }
  
  // Update output section with converted values
  function updateOutput(hsl) {
    const colorBlock = document.getElementById('color-block');
    const convertedHue = document.getElementById('converted_hue');
    const convertedSaturation = document.getElementById('converted_sat');
    const convertedLumincance = document.getElementById('converted_lum');
  
    const h = hsl[0];
    const s = hsl[1];
    const l = hsl[2];
  
    const convertedH = Math.round((h * 239) / 360);
    const convertedS = 240 - Math.round((s * 240) / 100);
    const convertedL = 0 + Math.round((l * 240) / 100);
  
    colorBlock.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
    
    convertedHue.textContent = `${convertedH}`;
    convertedSaturation.textContent = `${convertedS}`;
    convertedLumincance.textContent = `${convertedL}`;
  }
  
  // Mode buttons
  const rgbModeButton = document.getElementById('rgb-mode-button');
  const hexModeButton = document.getElementById('hex-mode-button');
  const hslModeButton = document.getElementById('hsl-mode-button');
  
  // Input sections
  const rgbInputSection = document.getElementById('rgb-input-section');
  const hexInputSection = document.getElementById('hex-input-section');
  const hslInputSection = document.getElementById('hsl-input-section');
  
  // Show/hide input sections based on mode selection
  rgbModeButton.addEventListener('click', function () {
    rgbModeButton.classList.add('active');
    hexModeButton.classList.remove('active');
    hslModeButton.classList.remove('active');
  
    rgbInputSection.classList.remove('hidden');
    hexInputSection.classList.add('hidden');
    hslInputSection.classList.add('hidden');


    syncSliderAndTextbox('red-slider', 'red-input');
    syncSliderAndTextbox('green-slider', 'green-input');
    syncSliderAndTextbox('blue-slider', 'blue-input');
  });
  
  hexModeButton.addEventListener('click', function () {
    hexModeButton.classList.add('active');
    rgbModeButton.classList.remove('active');
    hslModeButton.classList.remove('active');
  
    hexInputSection.classList.remove('hidden');
    rgbInputSection.classList.add('hidden');
    hslInputSection.classList.add('hidden');
  });
  
  hslModeButton.addEventListener('click', function () {
    hslModeButton.classList.add('active');
    rgbModeButton.classList.remove('active');
    hexModeButton.classList.remove('active');
  
    hslInputSection.classList.remove('hidden');
    rgbInputSection.classList.add('hidden');
    hexInputSection.classList.add('hidden');

    syncSliderAndTextbox('hue-slider', 'hue-input');
    syncSliderAndTextbox('saturation-slider', 'saturation-input');
    syncSliderAndTextbox('luminance-slider', 'luminance-input');
  });
  
  // Convert button
  const convertButton = document.getElementById('convert-button');
  
  convertButton.addEventListener('click', function () {
    let hsl;
  
    if (rgbModeButton.classList.contains('active')) {
      const red = parseInt(document.getElementById('red-input').value);
      const green = parseInt(document.getElementById('green-input').value);
      const blue = parseInt(document.getElementById('blue-input').value);
      hsl = rgbToHsl(red, green, blue);
    } else if (hexModeButton.classList.contains('active')) {
      const hex = document.getElementById('hex-input').value.replace('#', '');
      const rgb = hexToRgb(hex);
      hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    } else if (hslModeButton.classList.contains('active')) {
      const hue = parseInt(document.getElementById('hue-input').value);
      const saturation = parseInt(document.getElementById('saturation-input').value);
      const luminance = parseInt(document.getElementById('luminance-input').value);
      hsl = [hue, saturation, luminance];
    }
  
    updateOutput(hsl);
  });
  
  // Initial setup
  rgbModeButton.click();
  
  // Slider value and textbox synchronization
  function syncSliderAndTextbox(sliderId, textboxId) {
    const slider = document.getElementById(sliderId);
    const textbox = document.getElementById(textboxId);
  
    // Update slider value when textbox changes
    textbox.addEventListener('input', function () {
      slider.value = textbox.value;
    });
  
    // Update textbox value when slider changes
    slider.addEventListener('input', function () {
      textbox.value = slider.value;
    });
  }
  
  syncSliderAndTextbox('red-slider', 'red-input');
  syncSliderAndTextbox('green-slider', 'green-input');
  syncSliderAndTextbox('blue-slider', 'blue-input');
  syncSliderAndTextbox('hue-slider', 'hue-input');
  syncSliderAndTextbox('saturation-slider', 'saturation-input');
  syncSliderAndTextbox('luminance-slider', 'luminance-input');
  