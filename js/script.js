// Tiny JS only for the Appointment page
(function () {
  const form = document.getElementById('appointment-form');
  if (!form) return;

  const doctorSelect = document.getElementById('doctor');
  const dateInput = document.getElementById('date');
  const confirmation = document.getElementById('confirmation');
  const printBtn = document.getElementById('print-btn');
  const slipArea = document.getElementById('print-area');

  // Fixed doctor timings
  const doctorTimings = {
    "Dr. Mehta": "10:00 AM – 1:00 PM",
    "Dr. Sharma": "5:00 PM – 8:00 PM"
  };

  // Set minimum date to today
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;

  function formatDate(iso) {
    try {
      const d = new Date(iso + 'T00:00:00');
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' });
    } catch {
      return iso;
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const doctor = doctorSelect.value;
    const date = dateInput.value;

    // Basic validation
    if (!name || !age || !contact || !doctor || !date) {
      alert('Please fill all fields.');
      return;
    }

    const timing = doctorTimings[doctor] || '—';

    // Build the confirmation slip
    slipArea.innerHTML = `
      <div class="slip">
        <div class="slip-header">
          <div>
            <h3 style="margin:0;">Appointment Confirmation</h3>
            <p class="meta" style="margin:0.25rem 0 0 0;">Thank you, your appointment details are below.</p>
          </div>
          <span class="badge">Clinic Visit</span>
        </div>

        <dl>
          <dt>Patient Name</dt><dd>${name}</dd>
          <dt>Age</dt><dd>${age}</dd>
          <dt>Contact</dt><dd>${contact}</dd>
          <dt>Doctor</dt><dd>${doctor}</dd>
          <dt>Date</dt><dd>${formatDate(date)}</dd>
          <dt>Doctor Timings</dt><dd>${timing}</dd>
        </dl>

        <p class="help" style="margin-top:0.75rem;">Please arrive 10 minutes early. Bring any previous reports if available.</p>
      </div>
    `;

    // Show confirmation + auto-open print for quick PDF generation
    confirmation.style.display = 'block';
    // Give the browser a tick to render before printing
    setTimeout(() => window.print(), 150);
  });

  if (printBtn) {
    printBtn.addEventListener('click', function () {
      window.print();
    });
  }
})();