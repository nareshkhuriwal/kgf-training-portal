// src/pages/admin/Courses.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/ui/DataTable.jsx";
import { fetchCourses } from "../../store/slices/courseSlice";
import { Link } from "react-router-dom";

export default function Courses() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(s => s.course);
  useEffect(()=>{ dispatch(fetchCourses()); },[dispatch]);

  const cols = [
    { key: "id", title: "ID" },
    { key: "title", title: "Title" },
    { key: "status", title: "Status" },
    { key: "students_count", title: "Students" },
    { key: "rating", title: "Rating" },
  ];

  return (
    <div>
      <div className="mb-3 flex justify-between">
        <h2 className="text-lg font-semibold">Courses</h2>
        <Link to="/instructor/courses/new" className="rounded bg-brand px-3 py-2 text-white">Create course</Link>
      </div>

      <DataTable columns={cols} rows={list} onRowClick={(r)=>{}} />
      {loading && <p className="mt-3 text-sm">Loading…</p>}
    </div>
  );
}
