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
    "http://192.168.176.242:4000/student/?sessionId=" + sessionId
  );
  if (response.ok) {
    const result = await response.json();
    return {
      courseName: result.course.course.courseName,
      students: result.course.course.students,
    };
  }
};

const sendAttendancy = async (studentId) => {
  const sessionId = getSessionId();

  const response = await fetch(
    "http://192.168.176.242:4000/student/sendAttendancy",
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
    alert("Başarılı");
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
