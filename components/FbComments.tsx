import Image from 'next/image'
import { getComments } from '@/lib/api'
import type { Comment } from '@/lib/types'

export default async function FbComments() {
  const comments = await getComments()

  return (
    <section className="py-6 px-4 font-['Arial',Helvetica,sans-serif]">
      <div className="max-w-[650px] mx-auto border border-gray-200 rounded shadow-sm bg-white overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-4 pb-4 bg-gray-50">
          <div className="flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877f2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="text-[#231f20] text-[17.5px]">Facebook Comments Plugin</span>
          </div>
          <p className="mt-1 ml-[30px] text-[#65676b] text-[15px]">Comments powered by Facebook</p>
        </div>

        {/* Comment count */}
        <div className="px-4 py-4 text-[#231f20] text-base font-bold">3,158 Comments</div>

        {/* Comment list */}
        <ul className="pb-4">
          {comments.map((c) => (
            <li key={c.id}>
              <CommentItem comment={c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CommentItem({ comment }: { comment: Comment }) {
  const avatarSrc = `https://i.pravatar.cc/80?img=${comment.avatarId}`

  return (
    <div className={`flex gap-2.5 pb-1 pt-2 ${comment.isReply ? 'pl-[56px] pr-4' : 'px-4'}`}>
      <Image
        src={avatarSrc}
        alt={comment.name}
        width={36}
        height={36}
        className="rounded-full flex-shrink-0 object-cover bg-gray-200 w-9 h-9 mt-0.5"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <div className="bg-[#f0f2f5] rounded-lg border-l-2 border-[#e0e0e0] px-3 py-2.5">
          <p className="text-[#385898] text-[13px] font-bold leading-4">{comment.name}</p>
          {comment.messages.map((msg, i) => (
            <p key={i} className="mt-1 text-[#050505] text-[15px] leading-[22px]">
              {msg}
            </p>
          ))}
        </div>
        <div className="flex items-center gap-1.5 mt-1 ml-1 text-[#65676b] text-xs">
          <span>{comment.timeAgo}</span>
          <span className="text-[#bcc0c4]">&middot;</span>
          <button className="text-[#65676b] text-xs font-bold bg-transparent border-0 p-0 cursor-pointer hover:underline">
            Like
          </button>
          <span className="text-[#bcc0c4]">&middot;</span>
          <button className="text-[#65676b] text-xs font-bold bg-transparent border-0 p-0 cursor-pointer hover:underline">
            Reply
          </button>
          {comment.reactions && (
            <span className="ml-auto flex items-center gap-1">
              <span className="text-[#65676b] text-xs font-bold">{comment.reactions}</span>
              <span className="inline-flex items-center">
                <span className="w-[18px] h-[18px] rounded-full inline-flex items-center justify-center bg-[#1877f2] shadow-sm z-10 relative">
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="#fff">
                    <path d="M15 5.88L14 10h5.83a2 2 0 011.92 2.56l-2.33 8A2 2 0 0117.5 22H4a2 2 0 01-2-2v-8a2 2 0 012-2h2.76a2 2 0 001.79-1.11L12 2a3.13 3.13 0 013 3.88z" />
                  </svg>
                </span>
                <span className="w-[18px] h-[18px] rounded-full inline-flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500 shadow-sm -ml-1.5">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="#fff">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" />
                  </svg>
                </span>
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}