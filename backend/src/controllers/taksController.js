const { request, response } = require("express");
const tasksModel = require("../models/tasksModels")

const getAll = async (req,res) => {

   const tasks = await tasksModel.getAll()

   return res.status(200).json(tasks)
}

const getID = async(req,res) =>{
   const {id} = req.params
   
   const task = await tasksModel.getID(id)

   return res.status(200).json(task)
}

const createTask = async (req,res)=>{
  
   const createdTask = await tasksModel.createTaks(req.body)

   return res.status(201).json(createdTask)
};

const deleteTasks = async(req,res)=>{
   const {id} = req.params

   await tasksModel.deleteTasks(id); 
   return res.status(204).json()
}

const updateTasks = async(req,res)=>{
 const {id} = req.params
   await tasksModel.updateTasks(id,req.body)

   return res.status(200).json()
}


module.exports = {
   getAll,
   getID,
   createTask,
   deleteTasks,
   updateTasks
}