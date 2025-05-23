import crypto from "crypto";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path"
import fs from "fs"


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const JSON_DB_PATH = path.join(__dirname, 'database:2.json'); 
const CSV_DB_PATH = path.join(__dirname, 'database:2.csv');

// Helper function to initialize JSON file if it doesn't exist


const Controller = {

        getAll_user : (req,res) =>{
                fs.readFile("./database:2.json", "utf-8",(err,data) =>{
                        if(err){
                                res.status(400).json({msg:"error while reading file"});
                        }else{
                               const tempdata = JSON.parse(data);
                               res.status(200).json(tempdata); 
                        }
                });
         },
         Getuser_By_Id : (req,res) =>{
              fs.readFile(JSON_DB_PATH , "utf-8",(err,data)=>{
                const userId = req.params.id;
                console.log(`Attempting to find user with ID: ${userId}`);
                if (err) {
                console.error("Error reading JSON file for GetUserById:",err);
                return res.status(500).json({ message: "Erreur serveur lors de la lecture des données du carnet d'adresses." });
                 }
                const donnecourant = JSON.parse(data);
             const foundUser = donnecourant.find(contact => contact.id === userId);
             if (foundUser) {
                console.log(`User found: ${foundUser.nom} ${foundUser.prenom}`);
                return res.status(200).json(foundUser);
            } else {
                console.log(`User with ID ${userId} not found.`);
                return res.status(404).json({ message: `Utilisateur avec l'ID ${userId} non trouvé.` });
            }
              });
         },
        Create_User : (req,res) =>{
                const {nom,prenom,telephone,email,addresse,dateNaissance,note} = req.body;
                if(!nom || !prenom || !telephone || !addresse || !dateNaissance || !note){
                        console.log("inserez tout les champs");
                        return  res.status(400).send("insert field properly");
                }

                const id = crypto.randomUUID();

                const new_person = {
                      id:id,
                      nom:nom,
                      prenom:prenom,
                      email: email || null,
                      telephone:telephone,
                      addresse:addresse,dateNaissance:dateNaissance || null,
                      note:note|| null,
                }
                const initializeJsonDb = () => {
                        if (!fs.existsSync(JSON_DB_PATH)) {
                            fs.writeFileSync(JSON_DB_PATH, JSON.stringify([])); // Write an empty array
                        }
                    };// Call this once when your application starts
                      initializeJsonDb();
                
                fs.readFile(JSON_DB_PATH,"utf-8",(err,data)=>{
                        if(err){
                                console.log("error while reading json file");
                                return res.status(500).send({msg: "error while reading json file"});
                        }
                        const donnecourant = JSON.parse(data);
                        donnecourant.push(new_person);

                        fs.writeFile(JSON_DB_PATH,JSON.stringify(donnecourant,null,2),"utf-8" ,(err)=>{
                                if(err){
                                        console.log("error while writing");
                                  return  res.status(500).send("error while writing in file");
                                }
                                        //appending csv file
                                const isfileexisting = fs.existsSync(CSV_DB_PATH);
                                let contact_valeurcsv = `"${new_person.id}","${new_person.prenom}","${new_person.nom}","${new_person.telephone}","${new_person.email}","${new_person.addresse}","${new_person.dateNaissance}","${new_person.note}"\n`;

                                //metre l'entete dans le fichier csv 
                                let csvcontent ="";
                                if(!isfileexisting){
                                                csvcontent += "id,prenom,nom,telephone,email,adresse,dateNaissance,notes\n"
                                }
                                 csvcontent += contact_valeurcsv;

                                 //attaching the csv file 
                                 fs.appendFile(CSV_DB_PATH,csvcontent,"utf-8",(err)=>{
                                        if(err){
                                                console.log("error while writing in csv file");
                                        }return res.status(500).send("Erreur lors de lecriture");
                                 });
                                 console.log("User created and saved to JSON and CSV:");
                                 return res.status(201).json({ message: "Utilisateur créé avec succès !"});
                             
                        });
                });

         },
         Update_UserBy_ID : (req,res)=>{
         
         fs.readFile(JSON_DB_PATH,"utf-8",(err,data)=>{
                //  Get the user ID from the request parameters
                const userId = req.params.id;
                //  Get the fields to update from the request body
                const updatedFieldsfromrequest = req.body;
                const donnecourant = JSON.parse(data);
                const foundUser = donnecourant.find(contact => contact.id === userId);
                if(foundUser===-1){
                        console.log(`they user with id:${userId} was not found`);
                        return res.send(`user with id ${userId} not found`) ;
                };
                // We use spread syntax (...) to merge existing properties with new ones.
                // This way, only the provided fields are updated, others remain unchanged.

                const livinguser = donnecourant[foundUser];
                const update_user = {
                        ...livinguser,
                        ...updatedFieldsfromrequest,
                        id: userId //ceci nous rassure que l'utilisateur ne pouras pas change identifiant
                }
                donnecourant[foundUser] = update_user;
                console.log("User updated in memory:", update_user);
                fs.writeFile(JSON_DB_PATH,JSON.stringify(donnecourant,null,2),"utf-8", (err)=>{
                  if(err){
                        console.log("Error while updating in Json file");
                       return res.status(500).send("Error while updating in Json file");
                  }
                  let csvContent = "id,prenom,nom,telephone,email,adresse,dateNaissance,notes\n"; // CSV Headers

            // Iterate through the updated contacts array to create CSV lines
            donnecourant.forEach(livinguser => {
                // Ensure all fields are present, using empty string for optional ones if null
                const safeEmail = contact.email || '';
                const safeNotes = contact.notes || '';
                // Assuming telephone and adresse are strings. Adjust if they are objects.
                // const safeTelephone = typeof contact.telephone === 'object' ? JSON.stringify(contact.telephone) : contact.telephone;
                // const safeAdresse = typeof contact.adresse === 'object' ? JSON.stringify(contact.adresse) : contact.adresse;


                // csvContent += `"${contact.id}","${contact.prenom}","${contact.nom}","${safeTelephone}","${safeEmail}","${safeAdresse}","${contact.dateNaissance}","${safeNotes}"\n`;
            });

            // Overwrite the CSV file with the new complete content
        //     fs.writeFile(CSV_DB_PATH, csvContent, (writeCsvErr) => {
                });

         })
         },
}

export default Controller;