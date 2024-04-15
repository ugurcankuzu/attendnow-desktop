let fingerprint = null;
import(
  "https://cdn.jsdelivr.net/npm/@thumbmarkjs/thumbmarkjs/dist/thumbmark.umd.js"
).then(() => {
  ThumbmarkJS.getFingerprint().then((fp) => {
    fingerprint = fp;
  });
});
const getSessionId = () => {
  const sessionId = new URLSearchParams(window.location.search).get(
    "sessionId"
  );
  return sessionId;
};
const getStudents = async () => {
  const sessionId = getSessionId();
  const response = await fetch(
    "https://attendnow-backend-dk3uswmi6a-lm.a.run.app/student/?sessionId=" + sessionId
  );
  if (response.ok) {
    const result = await response.json();
    return {
      courseName: result.course.course.courseName,
      students: result.course.course.students,
    };
  } else {
    alert("We couldn't get the students from server. Please try again later.");
  }
};

const sendAttendancy = async (studentId) => {
  const sessionId = getSessionId();

  const response = await fetch(
    "https://attendnow-backend-dk3uswmi6a-lm.a.run.app/student/sendAttendancy",
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        sessionId: sessionId,
        deviceId: fingerprint,
        studentId: studentId,
      }),
    }
  );
  if (response.ok) {
    const result = await response.json();
    alert("Successfully sent your attendancy. You can close this window.");
  } else {
    alert("You may already send attendancy for this session.");
  }
};
const fillSelect = () => {
  const selectElement = document.querySelector("select");
  getStudents().then((data) => {
    data.students.forEach((student) => {
      const option = document.createElement("option");
      option.value = student._id;
      option.text = `${student.name} ${student.surname}`;
      selectElement.appendChild(option);
    });
  });
};

window.onload = () => fillSelect();
document.querySelector("button").onclick = () => {
  let studentId = document.querySelector("select").value;
  let sessionId = getSessionId();
  if (sessionId && studentId) {
    sendAttendancy(studentId);
  }
};
