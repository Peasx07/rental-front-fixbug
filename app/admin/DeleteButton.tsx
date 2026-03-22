"use client";

interface DeleteButtonProps {
  bookingId: string;
  deleteAction: (formData: FormData) => Promise<void>;
}

export default function DeleteButton({ bookingId, deleteAction }: DeleteButtonProps) {
  return (
    <form action={deleteAction} className="inline">
      <input type="hidden" name="bookingId" value={bookingId} />
      <button
        type="submit"
        className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition cursor-pointer"
        onClick={(e) => {
          if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบการจองนี้?")) {
            e.preventDefault();
          }
        }}
      >
        ลบ
      </button>
    </form>
  );
}