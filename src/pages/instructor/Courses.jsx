// src/pages/instructor/Courses.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/ui/DataTable.jsx";
import { fetchCourses } from "../../store/slices/courseSlice";
import { useNavigate } from "react-router-dom";

export default function InstructorCourses() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { list } = useSelector(s => s.course);

  useEffect(()=>{ dispatch(fetchCourses({ mine: 1 })); },[dispatch]); // backend should filter by owner_id (token)

  const cols = [
    { key: "id", title: "ID" },
    { key: "title", title: "Title" },
    { key: "status", title: "Status" },
    { key: "updated_at", title: "Updated" },
  ];
  return (
    <div>
      <div className="mb-3 flex justify-between">
        <h2 className="text-lg font-semibold">My Courses</h2>
        <button className="rounded bg-brand px-3 py-2 text-white" onClick={()=>nav("/instructor/courses/new")}>
          New course
        </button>
      </div>
      <DataTable columns={cols} rows={list} onRowClick={(r)=>nav(`/instructor/courses/${r.id}/edit`)}/>
    </div>
  );
}
