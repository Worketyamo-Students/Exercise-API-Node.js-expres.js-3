import fs from "fs";

const random_number = Math.floor(Math.random("") * 10000);
const idd1 = random_number.toString().padStart(3, "07");

// Generate_id : ()=>{
//     const ABC_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" ;
//     const  randomLetters = "";
//     for(i=o;i<3 ;i++){
//         const random_Index = Math.floor(MAth.random() * ABC_letters);
//         randomLetters += ABC_letters[random_Index];
//     } ;
//     const random_figure = Math.floor(Math.random() *1000);

//     return randomLetters + random_figure
// }

const MyControllers = {
  create_Book: (req, res) => {
    const { Title, Edition, Author, Price } = req.body;
    if (!Title || !Edition || !Author || !Price) {
      console.log("inserez tout les champs");
    }
    return res.status(400).json({ Error: "bad request" });

    const NewData = {
      Title,
      Edition,
      Author,
      Price,
    };
    const id = idd1;
    fs.readFile(
      "/home/zack/Documents/work et yamo docs/node.js/Cour :Intro/cour 5 node.js >express/Express.js,API,Node.JS ==> Devoir 3/Exercise: 1/database.json",
      "utf-8",
      (err, data) => {
        if (err) throw err;
        let insertdata = JSON.stringify(data);
        NewData.push(insertdata);
        
        fs.writeFile(
          "/home/zack/Documents/work et yamo docs/node.js/Cour :Intro/cour 5 node.js >express/Express.js,API,Node.JS ==> Devoir 3/Exercise: 1/database:1.json",
          JSON.stringify(insertdata, null, 2),
          "utf-8",
          (err, data) => {
            if (err) {
              res
                .status(400)
                .send(`<h1>hey an error occur</h1>`)
                .json({ msg: { error: "writing file" } });
            } else {
              console.log("Le livre a bien ete ajout");
              return res.status(200).json({ msg: { success: "Livre ajoute" } });
            }
          }
        );
        let La_Donne_en_CSV = `\n ${id},${Title},${Edition},${Author},${Price}`;
        fs.writeFile(
          "/home/zack/Documents/work et yamo docs/node.js/Cour :Intro/cour 5 node.js >express/Express.js,API,Node.JS ==> Devoir 3/Exercise: 1/database:1.csv",
          La_Donne_en_CSV,
          "utf-8",
          (err, data) => {
            if (err) {
              res
                .status(400)
                .send(`<h1>hey an error occur</h1>`)
                .json({ msg: { error: "writing file" } });
            } else {
              console.log("Le livre a bien ete ajout");
              return res.status(200).json({ msg: { success: "Livre ajoute" } });
            }
          }
        );
      }
    );
  },

  //read all books
  getAllBooks: (req, res) => {
    fs.readFile("./database:1.json", "utf-8", (err, data) => {
      if (err) {
        res.status(400).json({ msg: { Error: "Error while reading file" } });
      } else {
        const books = JSON.parse(data);
        res.status(200).json(books);
      }
    });
  },

  //modify user book
  UpdateBooks: (req, res) => {
    fs.readFile("./database:1.json", "utf-8", (err, data) => {
      if (err) {
        console.log("Error while reading file");
        res.status(400).json({ msg: { Error: "Error while reading file" } });
      } else {
        const { id } = req.params;
        const { title, edition, author, price } = req.body;
        const books = JSON.parse(data);
        const bookToUpdate = books.find((book) => book.id === id);
        if (!bookToUpdate) {
          res.status(404).json({ msg: { Error: "invalid id" } });
        } else {
          title ? (bookToUpdate.title = title) : bookToUpdate.title;
          edition ? (bookToUpdate.edition = edition) : bookToUpdate.edition;
          author ? (bookToUpdate.author = author) : bookToUpdate.author;
          price ? (bookToUpdate.price = price) : bookToUpdate.price;
          fs.writeFile(
            "./database:1.json",
            JSON.stringify(books, null, 2),
            "utf-8",
            (err) => {
              if (err) {
                console.log("Error while writing file");
                res
                  .status(400)
                  .json({ msg: { Error: "Error while writing json file" } });
              } else {
                console.log("Book updated successfully");
                res
                  .status(200)
                  .json({
                    msg: { success: "Book updated json file successfully" },
                  });
              }
            }
          );

          let La_Donne_en_CSV = `\n ${id.replace(",", "")},${title.replace(
            ",",
            ""
          )},${edition.replace(",", "")},${author.replace(
            ",",
            ""
          )},${price.replace(",", "")}`;

          fs.writeFile("./database:1.csv", La_Donne_en_CSV, "utf-8", (err) => {
            if (err) {
              console.log("Error while writing file");
              res
                .status(400)
                .json({ msg: { Error: "Error while writing csv file" } });
            } else {
              console.log("Book updated successfully");
              res
                .status(200)
                .json({
                  msg: { success: "Book updated csv file successfully" },
                });
            }
          });
        }
      }
    });
  },

  GetUserby_ID: (req, res) => {
    const { id } = req.params;

    fs.readFile(
      "/home/zack/Documents/work et yamo docs/node.js/Cour :Intro/cour 5 node.js >express/Express.js,API,Node.JS ==> Devoir 3/Exercise: 1/database:1.json",
      "utf-8",
      (err, data) => {
        if (err) {
          console.log("Error while reading file");
          return res
            .status(400)
            .json({ msg: { Error: "Error while reading file" } });
        }
        try {
          const book = JSON.parse(data);
          const bookcontent = book.find((book) => book.id === id);
          if (!bookcontent) {
            return res.status(404).json({ msg: { Error: "invalid id" } });
          } else {
            return res.status(200).json(bookcontent);
          }
        } catch (error) {
          if (error) {
            console.log("Error while parsing file");
            return res
              .status(400)
              .json({ msg: { Error: "Error while parsing file" } });
          }
        }
      }
    );
  },
};

export default MyControllers;
