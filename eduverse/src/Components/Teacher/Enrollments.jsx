import React from "react";
import { useState, useEffect, useContext } from "react";
import { getEnrolledStudent } from "../../Services/api";
import { AccountContext } from "../../Context/AccountProvider";
import { ImCross } from "react-icons/im";
import { Triangle } from "react-loader-spinner";

export const Enrollments = ({ enrollments, setShowEnrollment, cname }) => {
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { teacher } = useContext(AccountContext);

  useEffect(() => {
    setLoading(true);
    const fetchEnrolledStudents = async () => {
      const enrolled = await Promise.all(
        enrollments.map(async (mail) => {
          try {
            const data = await getEnrolledStudent(mail, teacher.token);
            setLoading(false);
            return data;
          } catch (error) {
            console.log(error);
            setLoading(false);
            return null;
          }
        })
      );
      setEnrolledStudents(enrolled.filter((student) => student !== null));
    };

    fetchEnrolledStudents();
  }, [enrollments]);

  // useEffect(() => {
  //   console.log("i am state:", enrolledStudents);
  // }, [enrolledStudents]);

  return loading ? (
    <div className="h-full w-full flex items-center justify-center p-6 px-16 mt-20">
      <Triangle visible={true} height="80" width="80" color="#31869f" />
    </div>
  ) : (
    <div className="w-full flex flex-col gap-4 mb-auto">
      <div className="w-full flex md:gap-4 gap-1 sm:text-2xl text-xl font-bold justify-center items-center text-cyan-700">
        <h1>Enrolled students in</h1>
        <h1>{cname}</h1>
        <button
          onClick={() => setShowEnrollment(false)}
          className="ml-auto p-8"
        >
          <ImCross />
        </button>
      </div>
      <table class="table-fixed w-full border break-words sm:text-base text-sm">
        <thead className="text-cyan-800 font-bold">
          <tr>
            <th className="py-4 text-lg border-2 border-[#31869f]">
              Student Name
            </th>
            <th className="py-4 text-lg border-2 border-[#31869f]">
              Student Phone Number
            </th>
            <th className="py-4 text-lg border-2 border-[#31869f]">
              Student Email
            </th>
            <th className="py-4 text-lg border-2 border-[#31869f]">
              Guardian's Phone Number
            </th>
            <th className="py-4 text-lg border-2 border-[#31869f]">
              Guardian's Email
            </th>
          </tr>
        </thead>
        <tbody>
          {enrolledStudents &&
            enrolledStudents.map((item, index) => (
              <tr key={index}>
                <td className="py-2 border-2  bg-[#c4fdfd67] border-[#31869f] px-3">
                  {item.name}
                </td>
                <td className="py-2  bg-[#c4fdfd67] border-2 border-[#31869f] px-3">
                  {item.phone}
                </td>
                <td className="py-2  bg-[#c4fdfd67] border-2 border-[#31869f] px-3">
                  {item.email}
                </td>
                <td className="py-2  bg-[#c4fdfd67] border-2 border-[#31869f] px-3">
                  {item.Gphone}
                </td>
                <td className="py-2  bg-[#c4fdfd67] border-2 border-[#31869f] px-3">
                  {item.GEmail}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
