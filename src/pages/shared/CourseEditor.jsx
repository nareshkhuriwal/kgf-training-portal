// src/pages/shared/CourseEditor.jsx
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourse, saveCourse, publishCourse,
  fetchSections, saveSection, deleteSection,
  fetchLessons, saveLesson, deleteLesson,
} from "../../store/slices/courseSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function CourseEditor() {
  const { id } = useParams(); // "new" or numeric
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { current, sections, lessons } = useSelector(s => s.course);
  const [meta, setMeta] = useState({ title: "", subtitle: "", status: "draft", language: "en", level: "all" });

  useEffect(() => {
    if (id && id !== "new") {
      dispatch(getCourse(id)).then(a => {
        if (getCourse.fulfilled.match(a)) setMeta({ ...meta, ...a.payload.data ?? a.payload });
      });
      dispatch(fetchSections(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const saveMeta = async () => {
    const payload = { ...meta, id: id !== "new" ? Number(id) : undefined };
    const res = await dispatch(saveCourse(payload));
    if (saveCourse.fulfilled.match(res)) {
      const newId = res.payload.data?.id ?? res.payload.id;
      if (id === "new") nav(`/instructor/courses/${newId}/edit`, { replace: true });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left: metadata form */}
      <div className="lg:col-span-1 space-y-3">
        <h2 className="text-lg font-semibold">Course details</h2>
        <Field label="Title" value={meta.title} onChange={e => setMeta({ ...meta, title: e.target.value })} />
        <Field label="Subtitle" value={meta.subtitle} onChange={e => setMeta({ ...meta, subtitle: e.target.value })} />
        <Field label="Language" value={meta.language} onChange={e => setMeta({ ...meta, language: e.target.value })} />
        <Select label="Level" value={meta.level} onChange={e => setMeta({ ...meta, level: e.target.value })}
          options={[["all", "All"], ["beginner", "Beginner"], ["intermediate", "Intermediate"], ["advanced", "Advanced"]]} />
        <div className="flex gap-2">
          <button className="rounded bg-brand px-3 py-2 text-white" onClick={saveMeta}>Save</button>
          {id !== "new" && (
            <button className="rounded border px-3 py-2" onClick={() => dispatch(publishCourse(id))}>Publish</button>
          )}
        </div>
      </div>

      {/* Right: sections & lessons */}
      <div className="lg:col-span-2">
        <SectionManager courseId={id} sections={sections} lessonsByKey={lessons} />
      </div>
    </div>
  );
}

function SectionManager({ courseId, sections, lessonsByKey }) {
  const dispatch = useDispatch();
  const [secForm, setSecForm] = useState({ title: "" });

  const saveSec = async (e) => {
    e.preventDefault();
    const res = await dispatch(saveSection({ courseId, ...secForm }));
    if (saveSection.fulfilled.match(res)) {
      setSecForm({ title: "" });
      dispatch(fetchSections(courseId));
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Sections</h3>
        <form onSubmit={saveSec} className="flex gap-2">
          <input value={secForm.title} onChange={e => setSecForm({ ...secForm, title: e.target.value })}
            placeholder="New section title" className="rounded border px-3 py-2" />
          <button className="rounded bg-brand px-3 py-2 text-white" type="submit">Add</button>
        </form>
      </div>

      <div className="space-y-4">
        {sections.map(sec => (
          <SectionRow key={sec.id} sec={sec} courseId={courseId} lessons={lessonsByKey[`${courseId}:${sec.id}`] || []} />
        ))}
      </div>
    </div>
  );
}

function SectionRow({ sec, courseId, lessons }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(sec.title);
  const [lesson, setLesson] = useState({ title: "", content_type: "video", video_url: "" });

  useEffect(() => { dispatch(fetchLessons({ courseId, sectionId: sec.id })); }, [dispatch, courseId, sec.id]);

  return (
    <div className="rounded border p-3">
      <div className="mb-2 flex items-center justify-between">
        <input className="w-full max-w-md rounded border px-3 py-2"
          value={title} onChange={e => setTitle(e.target.value)}
          onBlur={() => dispatch(saveSection({ courseId, id: sec.id, title }))} />
        <button className="rounded border px-2 py-1"
          onClick={() => dispatch(deleteSection({ courseId, id: sec.id })).then(() => dispatch(fetchSections(courseId)))}>
          Delete
        </button>
      </div>

      {/* Lessons */}
      <div className="ml-1">
        <div className="mb-2 text-sm font-medium">Lessons</div>
        <div className="space-y-2">
          {lessons.map(ls => (
            <div key={ls.id} className="flex items-center justify-between rounded border px-3 py-2">
              <div>
                <div className="font-medium">{ls.title}</div>
                <div className="text-xs opacity-70">{ls.content_type} • {ls.video_duration_sec ?? 0}s</div>
              </div>
              <button className="rounded border px-2 py-1"
                onClick={() => dispatch(deleteLesson({ courseId, sectionId: sec.id, id: ls.id }))
                  .then(() => dispatch(fetchLessons({ courseId, sectionId: sec.id })))}>Delete</button>
            </div>
          ))}
        </div>

        <form
          className="mt-3 flex flex-wrap gap-2"
          onSubmit={async (e) => {
            e.preventDefault();

            const payload = {
              ...lesson,                // title, content_type, video_url, id? (if editing)
              course_id: courseId,      // <-- body field
              section_id: sec.id,       // <-- body field
            };

            await dispatch(saveLesson(payload)); // thunk sends body-only

            setLesson({ title: "", content_type: "video", video_url: "" });
            // keep this as-is if your fetch API still needs params
            dispatch(fetchLessons({ courseId, sectionId: sec.id }));
          }}
        >

          <input className="min-w-[220px] grow rounded border px-3 py-2" placeholder="Lesson title"
            value={lesson.title} onChange={e => setLesson({ ...lesson, title: e.target.value })} />
          <select className="rounded border px-3 py-2"
            value={lesson.content_type} onChange={e => setLesson({ ...lesson, content_type: e.target.value })}>
            <option value="video">Video</option>
            <option value="article">Article</option>
            <option value="quiz">Quiz</option>
          </select>
          <input className="min-w-[240px] grow rounded border px-3 py-2" placeholder="Video URL / Resource"
            value={lesson.video_url} onChange={e => setLesson({ ...lesson, video_url: e.target.value })} />
          <button className="rounded bg-brand px-3 py-2 text-white" type="submit">Add lesson</button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, ...rest }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm">{label}</span>
      <input {...rest} className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-brand/30" />
    </label>
  );
}
function Select({ label, options, ...rest }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm">{label}</span>
      <select {...rest} className="w-full rounded border px-3 py-2">
        {options.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
      </select>
    </label>
  );
}
