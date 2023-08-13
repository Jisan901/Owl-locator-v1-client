function AllChats() {
    return (
        <div className="w-full max-w-xl mx-auto my-10 p-4">
            <h1 className="text-3xl text-center">All conversations</h1>
            <div className="flex flex-col justify-center items-center gap-4 my-10">
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
            </div>
        </div>
    )
}

export default AllChats;

function ChatItem() {
    return (
        <div className="flex relative items-center w-full space-x-3 bg-base-200 hover:bg-base-300 rounded-lg p-2 transition-colors">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/src/assets/i8l.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Ami Vala</div>
              <div className="text-sm opacity-50">You:hi !!!</div>
            </div>
            <span className="badge badge-primary absolute right-5">88</span>
        </div>
    )
}