import { useState, useEffect, useMemo, useRef } from "react";

type Post = {
    id: number;
    name: string;
    email: string;
    body: string;
};
const columns: { field: keyof Post; label: string }[] = [
    { field: "id", label: "Post ID" },
    { field: "name", label: "Name" },
    { field: "email", label: "Email" },
];

const defaultState = { currentPage: 1, itemsPerPage: 10 };
export default function PostTable() {
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState<keyof Post | "">("");
    const [sortOrder, setSortOrder] = useState<"" | "asc" | "desc">("");
    const savedState = JSON.parse(localStorage.getItem("tableState") || JSON.stringify(defaultState));
    const [currentPage, setCurrentPage] = useState(savedState.currentPage);
    const [itemsPerPage, setItemsPerPage] = useState(savedState.itemsPerPage);
    const inputRef = useRef<HTMLInputElement>(null);

    // on mount
    useEffect(() => {

        const saved = JSON.parse(localStorage.getItem("tableState") || JSON.stringify(defaultState));

        console.log(saved);
        if (saved.search) setSearch(saved.search);

        if (saved.sortField) setSortField(saved.sortField);
        if (saved.sortOrder) setSortOrder(saved.sortOrder);


    }, []);

    console.log(currentPage, itemsPerPage);     
    // persist
    useEffect(() => {
        localStorage.setItem("tableState", JSON.stringify({ search, sortField, sortOrder, currentPage, itemsPerPage }));
    }, [search, sortField, sortOrder, currentPage, itemsPerPage]);

    // Shortcut
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            const activeTag = (document.activeElement as HTMLElement)?.tagName;

            // Only trigger if `/` is pressed and not inside another input/textarea
            if (e.key === "/" && activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
                e.preventDefault(); // Stop `/` from being typed
                inputRef.current?.focus();
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // Fetch data
    useEffect(() => {
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/comments")
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Filter + sort
    const filteredData = useMemo(() => {
        let filtered = [...data];

        if (search) {
            const lower = search.toLowerCase();
            filtered = filtered.filter(
                (post) =>
                    post.name.toLowerCase().includes(lower) ||
                    post.email.toLowerCase().includes(lower) ||
                    post.body?.toLowerCase().includes(lower)

            );
        }

        if (sortField && sortOrder) {
            filtered.sort((a, b) => {
                let valA = a[sortField];
                let valB = b[sortField];
                if (typeof valA === "string") valA = valA.toLowerCase();
                if (typeof valB === "string") valB = valB.toLowerCase();
                if (valA < valB) return sortOrder === "asc" ? -1 : 1;
                if (valA > valB) return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [search, sortField, sortOrder, data]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (field: keyof Post) => {
        if (sortField !== field) {
            setSortField(field);
            setSortOrder("asc");
        } else {
            if (sortOrder === "asc") setSortOrder("desc");
            else if (sortOrder === "desc") {
                setSortField("");
                setSortOrder("");
            } else setSortOrder("asc");
        }
    };

    // Shimmer row component
    const ShimmerRow = () => (
        <tr>
            {[...Array(4)].map((_, i) => (
                <td key={i} className="px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse "></div>
                </td>
            ))}
        </tr>
    );

    return (
        <div className="text-lg p-4 sm:p-6 bg-white rounded-lg shadow-lg">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
                {/* Sort Buttons */}
                <div className="flex flex-wrap gap-2">
                    {columns.map(({ field, label }) => (
                        <button
                            key={field}
                            onClick={() => handleSort(field)}
                            className={`px-3 py-1.5 text-sm sm:text-base rounded-md border flex items-center gap-1 transition-all duration-200
      ${sortField === field
                                    ? "bg-blue-100 border-blue-300 text-blue-700"
                                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                                }`}
                        >
                            {label}
                            {sortField === field &&
                                (sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : "")}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="🔍 Press / to Search..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="px-3 py-2 text-sm sm:text-base border border-gray-200 rounded-md w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                />
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200">
                <div className="max-h-124 overflow-auto scrollbar-thin">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3 font-medium">Post ID</th>
                                <th className="px-6 py-3 font-medium">Name</th>
                                <th className="px-6 py-3 font-medium">Email</th>
                                <th className="px-6 py-3 font-medium">Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading
                                ? [...Array(itemsPerPage)].map((_, i) => <ShimmerRow key={i} />)
                                : paginatedData.map((post, idx) => (
                                    <tr
                                        key={post.id}
                                        className={`transition-colors duration-150 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-blue-50`}
                                    >
                                        <td className="px-6 py-3 font-semibold text-gray-800">
                                            {post.id}
                                        </td>
                                        <td className="px-6 py-3 truncate max-w-xs">{post.name}</td>
                                        <td className="px-6 py-3 text-blue-600 max-w-xs">{post.email}</td>
                                        <td className="px-6 py-3 truncate max-w-xs">{post.body}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>



            {/* Mobile Card View */}
            <div className="space-y-3 md:hidden">
                {loading
                    ? [...Array(itemsPerPage)].map((_, idx) => (
                        <div
                            key={idx}
                            className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm animate-pulse"
                        >
                            {/* Post ID */}
                            <div className="flex justify-between border-b border-gray-100 pb-2 mb-2">
                                <span className="h-3 w-12 bg-gray-200 rounded"></span>
                                <span className="h-3 w-8 bg-gray-200 rounded"></span>
                            </div>

                            {/* Name */}
                            <div className="flex justify-between border-b border-gray-100 pb-2 mb-2">
                                <span className="h-3 w-12 bg-gray-200 rounded"></span>
                                <span className="h-3 w-20 bg-gray-200 rounded"></span>
                            </div>

                            {/* Email */}
                            <div className="flex justify-between border-b border-gray-100 pb-2 mb-2">
                                <span className="h-3 w-12 bg-gray-200 rounded"></span>
                                <span className="h-3 w-24 bg-gray-200 rounded"></span>
                            </div>

                            {/* Comment */}
                            <div className="space-y-2 mt-2">
                                <span className="h-3 w-16 bg-gray-200 rounded"></span>
                                <div className="h-3 w-full bg-gray-200 rounded"></div>
                                <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ))
                    : paginatedData.map((post) => (
                        <div
                            key={post.id}
                            className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                        >
                            {/* Post ID */}
                            <div className="flex justify-between border-b border-gray-100 pb-2 mb-2">
                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                    Post ID
                                </span>
                                <span className="text-sm font-medium text-gray-800">
                                    #{post.id}
                                </span>
                            </div>

                            {/* Name */}
                            <div className="flex justify-between border-b border-gray-100 pb-2 mb-2">
                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                    Name
                                </span>
                                <span className="text-base font-medium text-gray-700 truncate max-w-[60%]">
                                    {post.name}
                                </span>
                            </div>

                            {/* Email */}
                            <div className="flex justify-between border-b border-gray-100 pb-2 mb-2">
                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                    Email
                                </span>
                                <span className="text-base text-blue-600 truncate max-w-[60%]">
                                    {post.email}
                                </span>
                            </div>

                            {/* Comment */}
                            <div>
                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                    Comment
                                </span>
                                <p className="text-base text-gray-600 mt-1">{post.body}</p>
                            </div>
                        </div>
                    ))}
            </div>



            {/* Pagination */}
            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-3">
                <span className="text-gray-600 text-sm">
                    {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                        currentPage * itemsPerPage,
                        filteredData.length
                    )} of ${filteredData.length} items`}
                </span>

                {/* Rows per page dropdown */}
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Rows:</label>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {[10, 50, 100].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>

                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p:number) => p - 1)}
                        className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 transition"
                    >
                        {"<"}
                    </button>
                    <span className="px-2 py-1 border border-gray-300 rounded-md bg-gray-50">
                        {currentPage}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p:number) => p + 1)}
                        className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 transition"
                    >
                        {">"}
                    </button>
                </div>
            </div>
        </div>
    );

}