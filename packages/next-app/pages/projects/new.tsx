import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Layout from "../../components/layout";
import { isValidURL } from "lib/utils";
// import LinkInput, { DEFAULT_LINKS } from "components/LinkInput";
import { useRouter } from "next/router";

import { useMutation } from "@apollo/client";
import { CREATE_PROJECT } from "../../data/mutations";

import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Container,
  StackDivider,
  Text,
  Avatar,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Alert,
  AlertIcon
} from "@chakra-ui/react";

const LINK_WEBSITE = "website";
const LINK_TWITTER = "twitter";
const LINK_OPENSEA = "opensea";

const LINKS = {
  [LINK_WEBSITE]: {
    name: "Website",
    slug: LINK_WEBSITE,
    displayPrefix: "http://",
    validationPrefix: "http://"
  },
  [LINK_TWITTER]: {
    name: "Twitter",
    slug: LINK_TWITTER,
    displayPrefix: "twitter.com/",
    validationPrefix: "http://twitter.com/"
  },
  [LINK_OPENSEA]: {
    name: "OpenSea",
    slug: LINK_OPENSEA,
    displayPrefix: "opensea.io/collection/",
    validationPrefix: "http://opensea.io/collection/"
  }
};

const DEFAULT_LINKS = [LINK_WEBSITE, LINK_TWITTER, LINK_OPENSEA];

export default function NewProject() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({});

  // const formInfo = useForm({});
  // console.log("formInfo", formInfo);

  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React();

  const [createProject, { data, loading, error }] = useMutation(CREATE_PROJECT);

  const [isMissingLink, setIsMissingLink] = useState(null);

  const signMessage = async () => {
    // if (!library) return;
    // try {
    //   const signature = await library.provider.request({
    //     method: "personal_sign",
    //     params: [message, account]
    //   });
    //   // setSignedMessage(message);
    //   // setSignature(signature);
    // } catch (error) {
    //   // setError(error);
    // }
  };

  function onSubmit(values) {
    const links = Object.fromEntries(
      Object.entries(values).filter(
        ([key, value]) => value !== "" && key !== "name"
      )
    );

    const message = {
      name: values.name,
      links
    };

    console.log("---- submitting message----", message);
    // console.log("filteredValues", filteredValues);
    // console.log("isDirty", isDirty);
    // const keys = Object.keys(values).filter(
    //   key => DEFAULT_LINKS.includes(key) && values[key] !== ""
    // );
    // const linkFound = keys.length > 0;
    // const missingLink = !linkFound && isDirty;
    // if (missingLink) {
    //   setIsMissingLink(true);
    // } else {
    //   setIsMissingLink(false);
    //   // Prepare links to submit
    //   console.log("we submit the form");
    //   console.log("values", values);
    //   createProject({
    //     variables: {
    //       name: "Luke",
    //       links: ["a", "b", "c"]
    //     }
    //   });
    // }

    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     alert(JSON.stringify(values, null, 2));
    //     resolve();
    //   }, 3000);
    // });
  }

  const atLeastOneLink = () => {
    const values = getValues();
    const keys = Object.keys(values).filter(
      key => DEFAULT_LINKS.includes(key) && values[key] !== ""
    );
    const linkFound = keys.length > 0;
    return linkFound;
  };

  const handleClick = () => {
    const values = getValues();
    console.log("values", values);
  };

  return (
    <Layout>
      <button onClick={handleClick}>Click</button>
      <Container py={{ base: "4", md: "8" }}>
        <Box onSubmit={handleSubmit(onSubmit)} as="form">
          <Stack spacing="5" divider={<StackDivider />}>
            <Stack
              direction={{ base: "column", lg: "row" }}
              spacing={{ base: "5", lg: "8" }}
              justify="space-between"
            >
              <Box flexShrink={0}>
                <Text fontSize="lg" fontWeight="medium">
                  Tell us more about this product
                </Text>
                <Text color="muted" fontSize="sm">
                  We’ll need its name, tagline, links, topics and description.
                </Text>
              </Box>
              <Box
                bg="bg-surface"
                boxShadow={useColorModeValue("sm", "sm-dark")}
                borderRadius="lg"
                flex="1"
                maxW={{ lg: "3xl" }}
              >
                <Stack
                  spacing="5"
                  px={{ base: "4", md: "6" }}
                  py={{ base: "5", md: "6" }}
                >
                  <Stack spacing="6" direction={{ base: "column", md: "row" }}>
                    <FormControl id="firstName" isInvalid={errors.name}>
                      <FormLabel>Name of the project</FormLabel>
                      <Input
                        id="name"
                        {...register("name", {
                          required: "Project name is required"
                        })}
                      />
                      <FormErrorMessage>
                        {errors.name && errors.name.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>
                </Stack>
              </Box>
            </Stack>

            <Stack
              direction={{ base: "column", lg: "row" }}
              spacing={{ base: "5", lg: "8" }}
              justify="space-between"
            >
              <Box flexShrink={0}>
                <Text fontSize="lg" fontWeight="medium">
                  Links
                </Text>
                <Text color="muted" fontSize="sm">
                  Where can others learn more
                </Text>
              </Box>
              <Box
                bg="bg-surface"
                boxShadow={useColorModeValue("sm", "sm-dark")}
                borderRadius="lg"
                flex="1"
                maxW={{ lg: "3xl" }}
              >
                <Stack
                  spacing="5"
                  px={{ base: "4", md: "6" }}
                  py={{ base: "5", md: "6" }}
                >
                  {isMissingLink && (
                    <Alert status="error">
                      <AlertIcon />
                      At least 1 link is required
                    </Alert>
                  )}
                  {DEFAULT_LINKS.map(link => {
                    const { name, displayPrefix, validationPrefix, slug } =
                      LINKS[link];
                    return (
                      <FormControl
                        id="website"
                        key={slug}
                        isInvalid={errors[slug]}
                        // isInvalid={errors[slug]}
                      >
                        <FormLabel>{name}</FormLabel>
                        <InputGroup>
                          {displayPrefix && (
                            <InputLeftAddon>{displayPrefix}</InputLeftAddon>
                          )}
                          <Input
                            id={slug}
                            {...register(slug, {
                              validate: value => {
                                const url = validationPrefix + value;
                                return (
                                  (isValidURL(url) && value != "") ||
                                  value == "" ||
                                  "😳 Oops, this isn't a valid url."
                                );
                              }
                            })}
                          />
                        </InputGroup>
                        <FormErrorMessage>
                          {errors[slug] && errors[slug].message}
                        </FormErrorMessage>
                      </FormControl>
                    );
                  })}
                </Stack>
                <Divider />
                <Flex
                  direction="row-reverse"
                  py="4"
                  px={{ base: "4", md: "6" }}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                </Flex>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Layout>
  );
}
