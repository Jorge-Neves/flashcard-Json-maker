import React, { useState, useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import styled, { css } from 'styled-components';

const NavBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  background-color: #dbd6c9;
  color: #2e2c38;
`;

const FileNameSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;

  padding: 5vh;
  background-color: #85586f;
  color: #2e2c38;
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: auto;
  width: 50vw;
  padding: 10vh;
  background-color: #ac7d88;
  color: #2e2c38;
`;
const DownloadButton = styled.button`
  background: linear-gradient(#e66465, #9198e5);
  margin: 1rem;
  padding: 1rem;
  color: white;
  border-radius: 0.5em;
`;

const ParallelSections = styled.div`
  display: flex;
  flex-direction: row;
`;

const JSONPreview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: auto;
  width: 50vw;
  padding: 10vh;
  background-color: #deb6ab;
  color: #44434a;
  text-align: left;
`;

const JSONmock = styled.div`
  text-align: left;
`;

const BodySection = styled.div`
  background-color: #85586f;
  z-index: -1;
`;

const Form = () => {
  const [fileNameState, setFileNameState] = useState('');
  const [jsonData, setJsonData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { control } = useForm({
    defaultValues: { JSONNumber: '' },
  });

  const onSubmit = async (data) => {
    console.log(data);
    jsonData.push(data);
    console.log(jsonData);
  };

  const watchFile = useWatch({ control, name: 'JSONNumber' });

  useEffect(() => {
    setFileNameState(watchFile);
    console.log(fileNameState);
  });

  const downloadJSON = async () => {
    const fileName = fileNameState;
    const json = JSON.stringify(jsonData);
    let blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    const href = await window.URL.createObjectURL(blob);
    link.href = href;
    link.download = fileName;
    link.click();
  };

  return (
    <BodySection>
      <NavBar>
        <h1 className="Input-spacing">JSON Maker</h1>
      </NavBar>
      <form>
        <FileNameSection>
          <Controller
            control={control}
            name="JSONNumber"
            render={({ field: { onChange, value, name } }) => (
              <>
                <h2 className="Input-spacing">JSON File Name</h2>
                <input
                  className="Input-spacing"
                  onChange={onChange}
                  name={name}
                  value={value}
                  placeholder="JSONNumber"
                />
              </>
            )}
          />
        </FileNameSection>
      </form>
      <ParallelSections>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeroSection>
            <h2 className="Input-spacing">Form</h2>
            <label className="Input-spacing">Question</label>
            <input
              className="Input-spacing"
              type="text"
              placeholder="Question"
              {...register('Question', { required: true })}
            />
            <label className="Input-spacing">Answer</label>
            <input
              className="Input-spacing"
              type="text"
              placeholder="Answer"
              {...register('Answer', { required: true })}
            />
            <label className="Input-spacing">Source</label>
            <input
              className="Input-spacing"
              type="text"
              placeholder="Source"
              {...register('Source', { required: true })}
            />
            <label className="Input-spacing">Type of Question</label>
            <select
              className="Input-spacing"
              {...register('TypeOfQuestion', { required: true })}
            >
              <option value="Short-Answer">Short-Answer</option>
              <option value="True/False">True/False</option>
              <option value="Multi-Choice">Multi-Choice</option>
              <option value="Cloze-Deletions">Cloze-Deletions</option>
            </select>
            <input className="Input-spacing" type="submit" />
            <DownloadButton
              className="Input-spacing"
              type="button"
              onClick={downloadJSON}
            >
              Download
            </DownloadButton>
          </HeroSection>
        </form>
        <JSONPreview>
          <JSONmock>{'['}</JSONmock>
          {jsonData.map((flashcard) => {
            return (
              <JSONmock>
                <br />
                {'{'}
                <br />
                <br /> "Question" : "{flashcard.Question}" ,
                <br /> "Answer" : "{flashcard.Answer}",
                <br /> "Source" : "{flashcard.Source}",
                <br /> "TypeOfQuestion" : "{flashcard.TypeOfQuestion}" <br />
                <br />
                {'},'}
                <br />
              </JSONmock>
            );
          })}
          <JSONmock>{']'}</JSONmock>
        </JSONPreview>
      </ParallelSections>
    </BodySection>
  );
};

export default Form;
