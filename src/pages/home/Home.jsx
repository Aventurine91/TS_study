import { useEffect, useState } from "react";
import Cards, { Card } from "./components/Cards";
import Loading from "../../shared/components/Loading";
import Layout, { WhiteContainer } from "../../shared/components/Layout";
import SearchBox from "./components/Search";
import "./css/home.css";
import { getLatestStudyApi, getStudyListApi, emojiApi } from "./api/homeApi";
import { setCookie } from "../../shared/hook/hook";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const page = 1;
  const [study, setStudy] = useState([{}]);
  const [studyLook, setStudyLook] = useState([{}]);
  const [cok, setCok] = useState([]);
  // const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [orderBy, setOrderBy] = useState("desc"); //asc
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const [lender, setLender] = useState(false);
  const navigate = useNavigate();
  const latest = setCookie("get", {
    cookieName: "studyLook",
  });

  function API(callBack = () => {}) {
    getStudyListApi(page, pageSize, orderBy, keyword).then((res) => {
      setStudy([...res.data]);
      setCok([...latest]);
      callBack();
    });
    let body = {
      id: [...latest].reverse(),
    };
    getLatestStudyApi(body).then((res) => {
      setStudyLook([...res.data]);
    });
  }
  useEffect(() => {
    setCardLoading(true);
    setTimeout(() => {
      API(() => {
        setCardLoading(false);
      });
    }, 1000);
  }, [pageSize, orderBy]);
  useEffect(() => {
    API();
  }, [lender]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      API(() => {
        setLoading(false);
        setCardLoading(false);
      });
    }, 1000);
  }, []);

  const moreBtnHandle = (e) => {
    e.preventDefault();
    setPageSize(pageSize + 6);
  };
  const searchHandle = (e) => {
    if (e.keyCode === 13 || e._reactName === "onClick") {
      setCardLoading(true);

      setTimeout(() => {
        getStudyListApi(1, 6, "desc", keyword).then((res) => {
          setStudy([...res.data]);
          setCardLoading(false);
        });
      }, 1000);
    }
  };
  const cardLink = (id, time = 0) => {
    setTimeout(() => {
      navigate(`/study/${id}`);
    }, time);
  };
  function emojiHandle(v) {
    let body = {
      id: v.id,
    };
    if (!lender)
      emojiApi(body).then((res) => {
        console.log("res", res);
        setLender(true);
        setTimeout(() => {
          setLender(false);
        }, 100);
      });
    else alert("기다려주세요");
  }
  return (
    <Layout paddingBottom={"174px"} paddingTop={"40px"} width={"1200px"}>
      <Loading loading={loading} />
      <WhiteContainer
        className=""
        title={"최근 조회한 스터디"}
        titleMargin={"40px"}
        marginBottom="40px"
      >
        <Cards noList="아직 조회한 스터디가 없어요" height="243px">
          {studyLook.map((v, i) => {
            if (!!v)
              return (
                <Card
                  key={i}
                  type={v.background}
                  point={v.point}
                  emoji={v.emojis}
                  inProgress={v.createdAt}
                  userName={v.nickName}
                  name={v.studyName}
                  onClick={() => {
                    cardLink(v.id);
                  }}
                  emojiHandle={emojiHandle}
                >
                  {v.introduce}
                </Card>
              );
          })}
        </Cards>
      </WhiteContainer>
      <WhiteContainer
        className=""
        title={"스터디 둘러보기"}
        titleMargin={"40px"}
      >
        <SearchBox
          selectValue={setOrderBy}
          inputValue={setKeyword}
          searchHandle={searchHandle}
        />
        <Cards
          noList="아직 둘러 볼 스터디가 없어요"
          height={!!!study.length ? "600px" : "auto"}
        >
          <Loading
            loading={cardLoading}
            style={{
              position: "absolute",
              height: "102%",
              background: "#fff",
              zIndex: 98,
            }}
          />
          {study.length > 0 ? (
            study.map((v, i) => {
              function details(e) {
                e.preventDefault();
                e.stopPropagation();
                const cookieName = "studyLook";
                let newArr = [...cok, v.id];
                setCok(newArr);
                setCookie("create", {
                  cookieName,
                  cookieValue: newArr,
                  end: 1,
                });

                cardLink(v.id);
              }
              let mbn = "";
              if (i < study.length - 3) mbn = "mbn";
              return (
                <Card
                  onClick={details}
                  key={i}
                  type={v.background}
                  point={v.point}
                  emoji={v.emojis}
                  inProgress={v.createdAt}
                  userName={v.nickName}
                  name={v.studyName}
                  className={mbn}
                  emojiHandle={emojiHandle}
                >
                  {v.introduce}
                </Card>
              );
            })
          ) : (
            <p className="noList">스터디가 없습니다.</p>
          )}
        </Cards>
        {!!study.length ? (
          <a href="#" onClick={moreBtnHandle} className="moreBtn">
            더보기
          </a>
        ) : null}
      </WhiteContainer>
    </Layout>
  );
}
