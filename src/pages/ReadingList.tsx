/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useAppSelector } from "../redux/hook";
import style from "./../pages-css/wishlist.module.css";
import { Badge, Tag, Tooltip, message } from "antd";
import { useDispatch } from "react-redux";
import { persistor } from "../redux/store";
import { isLoading } from "../redux/features/commonOptionsSlice";
import Loader from "../components/ui/loader";
import { BsFillHeartbreakFill, BsFillTrash3Fill } from "react-icons/bs";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import {
  removeFromMyReadingList,
  updateBookReadStatus,
} from "../redux/features/myReadingSlice";
import { MyReadingBook } from "../Interfaces/globalTypes";
import Swal from "sweetalert2";

export default function ReadingList() {
  const { myReadingsList } = useAppSelector((state) => state.readinglist);

  const dispatch = useDispatch();
  const { loading } = useAppSelector((state) => state.commonOptions);

  const handleClearStore = () => {
    dispatch(isLoading(true));
    persistor.purge();
    window.location.reload();
  };

  const handleRemoveFromReadingList = (book: MyReadingBook) => {
    dispatch(removeFromMyReadingList(book));
    message.open({
      type: "error",
      content: "Removed From Reading List",
    });
  };

  const handleUpdateBookReadStatus = (book: MyReadingBook) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then(() => {
      dispatch(updateBookReadStatus(book));
      Swal.fire("Updated!", "Book's Status is Updated.", "success");
    });
  };

  const statusColors = {
    "to-read": "cyan",
    reading: "blue",
    finished: "green",
  };

  return (
    <div className={style.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          {myReadingsList.length == 0 ? (
            <div className="my-56">
              <p className="text-2xl text-blue-400 text-center">
                My Reading List is Empty
              </p>
              <BsFillHeartbreakFill className="text-6xl text-red-700 block m-auto mt-5 " />
            </div>
          ) : (
            <>
              <Tooltip
                placement="topRight"
                title={"Remove All"}
                arrow={true}
                color={"blue"}
              >
                <BsFillTrash3Fill
                  onClick={() => handleClearStore()}
                  className="text-xl block ml-auto my-5 text-red-500 cursor-pointer"
                />
              </Tooltip>
              <div className={style.wishlistContainer}>
                {myReadingsList.map((a) => (
                  <Badge.Ribbon text={a.status} color={statusColors[a.status!]}>
                    <div className="w-full h-32 bg-gray-50 border border-white hover:shadow-md rounded hover:shadow-blue-500/50 p-2 flex justify-around">
                      <img className="w-24 h-28" src={a.image} />
                      <div className="flex flex-col w-96">
                        <p className="text-xl font-bold">{a.title}</p>
                        <p className="font-bold uppercase text-blue-400">
                          {a.genre}
                        </p>
                        <p className="font-bold text-lg">{a.publicationDate}</p>

                        <div className="flex items-center">
                          <Tooltip
                            placement="bottomLeft"
                            title={"Remove from Reading List"}
                            arrow={true}
                            color={"blue"}
                          >
                            <MdOutlinePlaylistAddCheck
                              onClick={() => handleRemoveFromReadingList(a)}
                              className="text-3xl text-red-500 cursor-pointer"
                            />
                          </Tooltip>
                          <Tag
                            className="ml-4 hover:bg-blue-400 hover:text-white cursor-pointer"
                            color="blue"
                            onClick={() => handleUpdateBookReadStatus(a)}
                          >
                            Update Status
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </Badge.Ribbon>
                ))}
              </div>{" "}
            </>
          )}
        </>
      )}
    </div>
  );
}
