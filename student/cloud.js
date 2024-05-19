const filePicker = document.querySelector("input");
filePicker.addEventListener("change", async (e) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    showLoader();
    const response = await fetch(
      "https://attendnow-backend-dk3uswmi6a-lm.a.run.app/cloud/uploadFile",
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) {
      const result = await response.json();
      showResultText(result.faces);
    } else {
      alert("Something went wrong while analyzing image. Please Try Again.");
    }
  }
});

const showLoader = () => {
  const result = document.getElementById("result");
  result.innerHTML = `<span class="spinner"
  ><svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>
      .spinner_P7sC {
        transform-origin: center;
        animation: spinner_svv2 0.75s infinite linear;
      }
      @keyframes spinner_svv2 {
        100% {
          transform: rotate(360deg);
        }
      }
    </style>
    <path
      d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
      class="spinner_P7sC"
    />
  </svg>
</span>`;
};

const showResultText = (faces) => {
  const result = document.getElementById("result");
  result.innerHTML = `Number of faces: ${faces}`;
};
